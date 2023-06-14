"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectToDatabase = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000, // Optional: Add a server selection timeout
            // Use the `indexes` option to enable automatic index creation
            // indexes: true,
        });
        console.log("Connected to MongoDB");
    }
    catch (error) {
        console.error("MongoDB connection error:", error);
    }
};
exports.connectToDatabase = connectToDatabase;
//# sourceMappingURL=db.js.map