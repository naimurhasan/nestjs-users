import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ArticleController } from './article.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ArticleEntity } from './article.entity';
import { Comment } from './comment.entity';
import { UserEntity } from 'src/user/entity/user.entity';
import { ArticleService } from './article.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity, Comment, UserEntity]), UserModule],
  providers: [ArticleService],
  controllers: [
    ArticleController
  ]
})
export class ArticleModule {
  
}
