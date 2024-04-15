import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ContactController } from './contact.controller';
import { ContactModel } from './contact.model';
import { ContactService } from './contact.services';

@Module({
    imports: [TypeOrmModule.forFeature([ContactModel])],
    controllers: [ContactController],
    providers: [ContactService],
})
export class ContactModule {}
