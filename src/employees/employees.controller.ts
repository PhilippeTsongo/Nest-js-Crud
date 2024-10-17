import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ParseIntPipe, ValidationPipe } from '@nestjs/common';

import { EmployeesService } from './employees.service';
import { Prisma } from '@prisma/client';
import { SkipThrottle, Throttle } from '@nestjs/throttler';

@Controller('employees')
export class EmployeesController {
	constructor(private readonly employeesService: EmployeesService) { }

	@Post()
	create(@Body() createEmployeeDto: Prisma.EmployeeCreateInput) {
		return this.employeesService.create(createEmployeeDto);
	}

	@Get()
	findAll(@Query('role') role?: 'ADMIN' | 'USER' ) {
		return this.employeesService.findAll(role);
	}

	@Throttle({ long:{ ttl: 6000, limit: 2 }})
	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.employeesService.findOne(+id);
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateEmployeeDto: Prisma.EmployeeUpdateInput) {
		return this.employeesService.update(+id, updateEmployeeDto);
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.employeesService.remove(+id);
	}
}
