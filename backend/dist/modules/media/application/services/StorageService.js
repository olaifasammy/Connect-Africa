"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageService = void 0;
class StorageService {
    storageProvider;
    constructor(storageProvider) {
        this.storageProvider = storageProvider;
    }
    async upload(path, data) {
        return this.storageProvider.upload(path, data);
    }
    async download(path) {
        return this.storageProvider.download(path);
    }
    async delete(path) {
        return this.storageProvider.delete(path);
    }
}
exports.StorageService = StorageService;
//# sourceMappingURL=StorageService.js.map