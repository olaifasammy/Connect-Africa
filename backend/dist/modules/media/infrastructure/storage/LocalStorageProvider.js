"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalStorageProvider = void 0;
const StorageProvider_1 = require("../../../../shared/infrastructure/storage/StorageProvider");
const fs = __importStar(require("fs/promises"));
const path = __importStar(require("path"));
class LocalStorageProvider extends StorageProvider_1.StorageProvider {
    storageDir;
    constructor(storageDir) {
        super();
        this.storageDir = storageDir;
    }
    async upload(filePath, data) {
        const fullPath = path.join(this.storageDir, filePath);
        await fs.mkdir(path.dirname(fullPath), { recursive: true });
        await fs.writeFile(fullPath, data);
        return fullPath;
    }
    async download(filePath) {
        return fs.readFile(filePath);
    }
    async delete(filePath) {
        await fs.unlink(filePath);
    }
}
exports.LocalStorageProvider = LocalStorageProvider;
//# sourceMappingURL=LocalStorageProvider.js.map