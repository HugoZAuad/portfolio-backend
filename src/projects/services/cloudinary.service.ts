import { Injectable, Logger } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse } from 'cloudinary';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CloudinaryService {
  private readonly logger = new Logger(CloudinaryService.name);

  constructor(private configService: ConfigService) {
    cloudinary.config({
      cloud_name: this.configService.get<string>('CLOUDINARY_CLOUD_NAME'),
      api_key: this.configService.get<string>('CLOUDINARY_API_KEY'),
      api_secret: this.configService.get<string>('CLOUDINARY_API_SECRET'),
      secure: true,
    });
  }

  async uploadImage(file: Express.Multer.File): Promise<UploadApiResponse> {
    this.logger.log('Iniciando upload da imagem para Cloudinary');
    try {
      const result = await new Promise<UploadApiResponse>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: 'projects' },
          (error, result) => {
            if (error) {
              this.logger.error(
                'Erro no upload da imagem para Cloudinary',
                error,
              );
              return reject(new Error(error.message));
            }
            if (!result) {
              const errMsg =
                'Nenhum resultado retornado do upload para Cloudinary';
              this.logger.error(errMsg);
              return reject(new Error(errMsg));
            }
            this.logger.log(
              'Upload da imagem para Cloudinary concluído com sucesso',
            );
            resolve(result);
          },
        );
        uploadStream.end(file.buffer);
      });
      return result;
    } catch (error) {
      this.logger.error('Erro no upload da imagem para Cloudinary', error);
      throw new Error(error.message);
    }
  }
}
