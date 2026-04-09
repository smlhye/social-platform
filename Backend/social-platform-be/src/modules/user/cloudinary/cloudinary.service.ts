import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import { CLOUD_CONFIG } from "src/config/config.tokens";
import type { CloudConfig } from "src/config/config.types";
import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

@Injectable()
export class CloudinaryService implements OnModuleInit {
    constructor(
        @Inject(CLOUD_CONFIG)
        private readonly cloudConfig: CloudConfig
    ) { }

    onModuleInit() {
        cloudinary.config({
            cloud_name: this.cloudConfig.cloudName,
            api_key: this.cloudConfig.apiKey,
            api_secret: this.cloudConfig.apiSecret,
        });
    }

    uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
        return new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream(
                { folder: "avatars" },
                (error, result) => {
                    if (error) return reject(error);
                    if (!result) return reject(new Error("Upload failed"));
                    resolve(result);
                }
            ).end(file.buffer);
        });
    }
}