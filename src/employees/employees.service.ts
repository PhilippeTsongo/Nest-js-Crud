import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { DatabaseService } from '../database/database.service';

@Injectable()
export class EmployeesService {

	constructor(private readonly dataBaseService: DatabaseService) {}

	async create(createEmployeeDto: Prisma.EmployeeCreateInput) {
		return this.dataBaseService.employee.create({
			data:createEmployeeDto
		});
	}

	async findAll(role?: 'ADMIN' | 'USER') {
		if(role) return this.dataBaseService.employee.findMany({
			where: {
				role,
			}
		});

		return this.dataBaseService.employee.findMany()
	}

	async findOne(id: number) {
		return this.dataBaseService.employee.findUnique({
			where: {
				id,
			}
		});
	}
 
	async update(id: number, updateEmployeeDto: Prisma.EmployeeUpdateInput) {
		return this.dataBaseService.employee.update({
			where: {
				id,
			},
			data: updateEmployeeDto,
		});
	}

	async remove(id: number) {
		return this.dataBaseService.employee.delete({
			where: {
				id,
			}
		});
	}
}
