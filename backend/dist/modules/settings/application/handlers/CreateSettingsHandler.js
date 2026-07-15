"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateSettingsHandler = void 0;
const Settings_1 = require("../../domain/entities/Settings");
const SettingsValueObjects_1 = require("../../domain/value-objects/SettingsValueObjects");
const UniqueEntityId_1 = require("../../../../shared/domain/UniqueEntityId");
class CreateSettingsHandler {
    settingsRepository;
    constructor(settingsRepository) {
        this.settingsRepository = settingsRepository;
    }
    async handle(command) {
        const settings = new Settings_1.Settings({
            userId: command.userId,
            theme: new SettingsValueObjects_1.Theme(command.theme),
            timezone: new SettingsValueObjects_1.Timezone(command.timezone),
            locale: new SettingsValueObjects_1.Locale(command.locale)
        }, new UniqueEntityId_1.UniqueEntityId(command.userId));
        await this.settingsRepository.save(settings);
    }
}
exports.CreateSettingsHandler = CreateSettingsHandler;
//# sourceMappingURL=CreateSettingsHandler.js.map