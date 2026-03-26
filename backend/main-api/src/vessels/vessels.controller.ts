import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common';
import { VesselsService } from './vessels.service';
import { Prisma } from '@prisma/client';
import { Roles } from '../auth/decorators/roles.decorator';
@Controller('vessels')
export class VesselsController {
    constructor(private readonly vesselsService: VesselsService) { }

    @Post()
    create(@Body() createVesselDto: Prisma.VesselCreateInput) {
        return this.vesselsService.create(createVesselDto);
    }

    @Get()
    findAll() {
        return this.vesselsService.findAll();
    }

    @Get(':id')
    @Roles('ADMIN', 'OPERATOR', 'VIEWER')
    findOne(@Param('id') id: string) {
        return this.vesselsService.findOne(id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateVesselDto: Prisma.VesselUpdateInput) {
        return this.vesselsService.update(id, updateVesselDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.vesselsService.remove(id);
    }
}
