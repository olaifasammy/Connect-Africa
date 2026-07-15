"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cacheMetadata = void 0;
const cacheMetadata = (cacheProvider) => async (req, res, next) => {
    const key = `media_meta_${req.params.id}`;
    const cached = await cacheProvider.get(key);
    if (cached) {
        return res.json(JSON.parse(cached));
    }
    const originalJson = res.json;
    res.json = (body) => {
        cacheProvider.set(key, JSON.stringify(body), 3600);
        return originalJson.call(res, body);
    };
    next();
};
exports.cacheMetadata = cacheMetadata;
//# sourceMappingURL=MediaCacheMiddleware.js.map