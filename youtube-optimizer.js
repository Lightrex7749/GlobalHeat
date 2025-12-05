// YouTube Lazy Loading Optimization
document.addEventListener('DOMContentLoaded', () => {
    // Find all YouTube iframes and convert to lazy load
    const youtubeIframes = document.querySelectorAll('iframe[src*="youtube.com"]');
    
    youtubeIframes.forEach(iframe => {
        const src = iframe.getAttribute('src');
        
        // Replace with youtube-nocookie.com for privacy and less tracking
        if (src && !src.includes('youtube-nocookie.com')) {
            const newSrc = src.replace('youtube.com', 'youtube-nocookie.com');
            iframe.setAttribute('data-src', newSrc);
            iframe.removeAttribute('src');
            iframe.setAttribute('loading', 'lazy');
            
            // Add intersection observer for lazy loading
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyIframe = entry.target;
                        const dataSrc = lazyIframe.getAttribute('data-src');
                        if (dataSrc) {
                            lazyIframe.setAttribute('src', dataSrc);
                            lazyIframe.removeAttribute('data-src');
                        }
                        observer.unobserve(lazyIframe);
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            observer.observe(iframe);
        }
    });
});
