class NSC_IAToken {
    constructor() {
        this.tokenId = this.generateToken();
        this.expirationTime = Date.now() + 300000; // 5 minutes in milliseconds
    }

    generateToken() {
        const timestamp = Date.now().toString();
        const hash = this.sha256(timestamp);
        return hash;
    }

    sha256(message) {
        return crypto.subtle.digest("SHA-256", new TextEncoder().encode(message)).then((hashBuffer) => {
            const hashArray = Array.from(new Uint8Array(hashBuffer));
            return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
        });
    }

    async isValid() {
        const currentTime = Date.now();
        return currentTime < this.expirationTime;
    }
}

class SEAAsset {
    constructor(origin, value) {
        this.origin = origin;
        this.value = value;
        this.createdAt = new Date().toISOString(); // ISO format
    }
}

class Cache {
    constructor() {
        this.MAX_SIZE = 3;
        this.keys = [];
        this.values = [];
    }

    async add(token, key, value, origin) {
        if (!await token.isValid()) {
            console.log("Invalid token. Operation denied.");
            return;
        }

        if (this.keys.length >= this.MAX_SIZE) {
            console.log("Removed from cache (LRU): " + this.keys[0]);
            this.keys.shift();
            this.values.shift();
        }

        const seaAsset = new SEAAsset(origin, value);
        this.keys.push(key);
        this.values.push(seaAsset);
        console.log("New item added to cache: " + key);
    }

    async get(token, key) {
        if (!await token.isValid()) {
            console.log("Invalid token. Operation denied.");
            return null;
        }

        const index = this.keys.indexOf(key);
        if (index !== -1) {
            console.log("Item found in cache: " + key);
            console.log(`Value: ${this.values[index].value}`);
            return this.values[index];
        }
        console.log("Item not found in cache: " + key);
        return null;
    }

    async remove(token, key) {
        if (!await token.isValid()) {
            console.log("Invalid token. Operation denied.");
            return;
        }

        const index = this.keys.indexOf(key);
        if (index !== -1) {
            console.log("Item removed from cache: " + key);
            this.keys.splice(index, 1);
            this.values.splice(index, 1);
        }
    }

    async list(token) {
        if (!await token.isValid()) {
            console.log("Invalid token. Operation denied.");
            return;
        }

        console.log("Listing all items in cache:");
        for (let i = 0; i < this.keys.length; i++) {
            console.log(`${this.keys[i]}: ${this.values[i].value} (Origin: ${this.values[i].origin}, Created At: ${this.values[i].createdAt})`);
        }
    }
}

// Cache operations using promises for async execution
async function cacheOperations(cache, token) {
    await cache.add(token, "Key1", 100.0, "System A");
    await cache.add(token, "Key2", 200.0, "System B");
    await cache.get(token, "Key1");
    await cache.remove(token, "Key1");
}

// Main execution
(async () => {
    const token = new NSC_IAToken();
    const myCache = new Cache();

    await cacheOperations(myCache, token);

    // List remaining items in the cache
    await myCache.list(token);
})();
