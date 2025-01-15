interface SaveOptions {
  category?: string;
  tags?: string[];
  priority?: 'high' | 'medium' | 'low';
  readLater?: boolean;
}

class BookooPopup {
  private static async getCurrentTab(): Promise<chrome.tabs.Tab> {
    const queryOptions = { active: true, currentWindow: true };
    const [tab] = await chrome.tabs.query(queryOptions);
    return tab;
  }

  static async initialize(): Promise<void> {
    const saveButton = document.getElementById('saveButton');
    const categorySelect = document.getElementById('category') as HTMLSelectElement;
    const tagsInput = document.getElementById('tags') as HTMLInputElement;
    
    if (saveButton) {
      saveButton.addEventListener('click', async () => {
        const options: SaveOptions = {
          category: categorySelect?.value,
          tags: tagsInput?.value.split(',').map(tag => tag.trim()),
          readLater: true
        };
        
        await this.savePage(options);
      });
    }

    // Load categories from storage
    const { categories } = await chrome.storage.sync.get('categories');
    if (categories && categorySelect) {
      categories.forEach((category: string) => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
      });
    }
  }

  private static async savePage(options: SaveOptions): Promise<void> {
    const tab = await this.getCurrentTab();
    
    if (!tab.id) return;

    // Get page metadata from content script
    chrome.tabs.sendMessage(tab.id, { action: 'capturePageMetadata' }, async (metadata) => {
      const bookmark = {
        ...metadata,
        ...options,
        savedAt: new Date().toISOString()
      };

      // Save to local storage first (offline support)
      await this.saveToLocalStorage(bookmark);

      // Try to sync with backend
      try {
        await this.syncWithBackend(bookmark);
        document.getElementById('status')!.textContent = 'Saved successfully!';
      } catch (error) {
        console.error('Failed to sync with backend:', error);
        document.getElementById('status')!.textContent = 'Saved locally. Will sync later.';
        // Mark for future sync
        await this.markForSync(bookmark);
      }
    });
  }

  private static async saveToLocalStorage(bookmark: any): Promise<void> {
    const { bookmarks = [] } = await chrome.storage.local.get('bookmarks');
    bookmarks.push(bookmark);
    await chrome.storage.local.set({ bookmarks });
  }

  private static async syncWithBackend(bookmark: any): Promise<void> {
    const { apiUrl } = await chrome.storage.sync.get('apiUrl');
    const { token } = await chrome.storage.sync.get('token');

    const response = await fetch(`${apiUrl}/bookmarks`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(bookmark)
    });

    if (!response.ok) {
      throw new Error('Failed to sync with backend');
    }
  }

  private static async markForSync(bookmark: any): Promise<void> {
    const { syncQueue = [] } = await chrome.storage.local.get('syncQueue');
    syncQueue.push(bookmark);
    await chrome.storage.local.set({ syncQueue });
  }
}

// Initialize popup when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  BookooPopup.initialize();
});