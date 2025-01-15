interface PageMetadata {
  title: string;
  url: string;
  description: string;
  image: string;
  favicon: string;
  content: string;
}

class PageCapture {
  static getMetadata(): PageMetadata {
    const metadata: PageMetadata = {
      title: document.title,
      url: window.location.href,
      description: this.getDescription(),
      image: this.getMainImage(),
      favicon: this.getFavicon(),
      content: this.getMainContent()
    };
    return metadata;
  }

  private static getDescription(): string {
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription && metaDescription.getAttribute('content')) {
      return metaDescription.getAttribute('content') || '';
    }
    return '';
  }

  private static getMainImage(): string {
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage && ogImage.getAttribute('content')) {
      return ogImage.getAttribute('content') || '';
    }
    
    const firstImage = document.querySelector('img');
    return firstImage ? firstImage.src : '';
  }

  private static getFavicon(): string {
    const favicon = document.querySelector('link[rel="icon"]') || 
                   document.querySelector('link[rel="shortcut icon"]');
    return favicon ? favicon.getAttribute('href') || '' : '';
  }

  private static getMainContent(): string {
    // Try to get the main content using common selectors
    const contentSelectors = [
      'article',
      '[role="main"]',
      'main',
      '.main-content',
      '#main-content'
    ];

    for (const selector of contentSelectors) {
      const element = document.querySelector(selector);
      if (element) {
        return element.textContent || '';
      }
    }

    // Fallback to body content
    return document.body.textContent || '';
  }
}

// Listen for messages from the popup or background script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'capturePageMetadata') {
    const metadata = PageCapture.getMetadata();
    sendResponse(metadata);
  }
});