// 分享模块
class Share {
    constructor() {
        this.maxUrlLength = CONFIG.MAX_URL_LENGTH;
        this.baseUrl = window.location.origin + window.location.pathname;
    }

    // 生成分享链接
    generateLink(code) {
        try {
            const compressed = this.compress(code);
            const url = `${this.baseUrl}?code=${compressed}`;
            
            if (url.length > this.maxUrlLength) {
                throw new Error('代码太长，无法生成分享链接');
            }

            return url;
        } catch (error) {
            console.error('生成分享链接失败:', error);
            throw error;
        }
    }

    // 压缩代码
    compress(code) {
        const json = JSON.stringify(code);
        if (typeof LZString !== 'undefined') {
            return LZString.compressToEncodedURIComponent(json);
        }
        // 降级方案：使用base64
        return btoa(encodeURIComponent(json));
    }

    // 解压代码
    decompress(compressed) {
        try {
            let json;
            if (typeof LZString !== 'undefined') {
                json = LZString.decompressFromEncodedURIComponent(compressed);
            } else {
                json = decodeURIComponent(atob(compressed));
            }
            return JSON.parse(json);
        } catch (error) {
            console.error('解压失败:', error);
            return null;
        }
    }

    // 从URL加载代码
    loadFromURL() {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        
        if (code) {
            return this.decompress(code);
        }
        
        return null;
    }

    // 复制分享链接
    async copyShareLink(code) {
        try {
            const link = this.generateLink(code);
            const success = await copyToClipboard(link);
            
            if (success) {
                showNotification('分享链接已复制到剪贴板', 'success');
                return link;
            } else {
                throw new Error('复制失败');
            }
        } catch (error) {
            showNotification(error.message || '生成分享链接失败', 'error');
            return null;
        }
    }
}