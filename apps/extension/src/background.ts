interface SyncQueueItem {
	id: string;
	data: any;
	attempts: number;
}

class BookooBackground {
	private static SYNC_INTERVAL = 5 * 60 * 1000; // 5 minutes
	private static MAX_SYNC_ATTEMPTS = 3;

	static initialize(): void {
		// Start sync process
		this.startPeriodicSync();

		// Listen for installation
		chrome.runtime.onInstalled.addListener(this.handleInstalled.bind(this));
	}

	private static async handleInstalled(
		details: chrome.runtime.InstalledDetails
	): Promise<void> {
		if (details.reason === "install") {
			// Set default settings
			await chrome.storage.sync.set({
				apiUrl: "https://api.bookoo.app",
				categories: ["Reading List", "Work", "Personal", "Research"],
				syncInterval: this.SYNC_INTERVAL,
			});
		}
	}

	private static async startPeriodicSync(): Promise<void> {
		// Initial sync
		await this.syncQueuedItems();

		// Set up periodic sync
		setInterval(async () => {
			await this.syncQueuedItems();
		}, this.SYNC_INTERVAL);
	}

	private static async syncQueuedItems(): Promise<void> {
		const { syncQueue = [] } = await chrome.storage.local.get("syncQueue");
		const { token } = await chrome.storage.sync.get("token");
		const { apiUrl } = await chrome.storage.sync.get("apiUrl");

		if (!token || !apiUrl || syncQueue.length === 0) return;

		const newQueue: SyncQueueItem[] = [];

		for (const item of syncQueue) {
			if (item.attempts >= this.MAX_SYNC_ATTEMPTS) {
				continue; // Skip items that have reached max attempts
			}

			try {
				await fetch(`${apiUrl}/bookmarks`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify(item.data),
				});
			} catch (error) {
				newQueue.push({
					...item,
					attempts: (item.attempts || 0) + 1,
				});
			}
		}

		// Update sync queue
		await chrome.storage.local.set({ syncQueue: newQueue });
	}

	// Handle messages from popup or content script
	static async handleMessage(
		message: any,
		sender: chrome.runtime.MessageSender,
		sendResponse: (response?: any) => void
	): Promise<void> {
		switch (message.action) {
			case "syncNow":
				await this.syncQueuedItems();
				sendResponse({ success: true });
				break;

			case "updateSettings":
				await chrome.storage.sync.set(message.settings);
				sendResponse({ success: true });
				break;

			default:
				sendResponse({ error: "Unknown action" });
		}
	}
}

// Initialize background script
BookooBackground.initialize();

// Listen for messages
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	BookooBackground.handleMessage(message, sender, sendResponse);
	return true; // Required for async response
});

chrome.runtime.onInstalled.addListener(() => {
	console.log("Extension installed");
});
