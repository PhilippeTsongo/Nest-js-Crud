import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [
        {
            "id": 1,
            "name": "Philippe",
            "email": "philippetsongo90@gmail.com",
            "role": "ADMIN"
        },
        {
            "id": 2,
            "name": "John",
            "email": "johndoe90@gmail.com",
            "role": "USER"
        },
        {
            "id": 3,
            "name": "Jane",
            "email": "janedoe90@gmail.com",
            "role": "USER"
        },
        {
            "id": 4,
            "name": "Brook",
            "email": "brook0@gmail.com",
            "role": "ADMIN"
        }
    ]

    findAll(role?: 'ADMIN' | 'USER'){
        if(role){
            const roles = this.users.filter(user => user.role === role)
            if(roles.length === 0) throw new NotFoundException('User with role ' + role + ' not found')
            
            return roles
        }
        return this.users
    }

    findOne(id: number){
        const user = this.users.find(user => user.id === id)
        if(!user) throw new NotFoundException('User not found')

        return user
    }

    create(createUserDto: CreateUserDto){
        const higestUserId = [...this.users].sort((a,b) => b.id - a.id)
        const newUser = {
            id: higestUserId[0].id + 1,
            ...createUserDto
        }    

        this.users.push(newUser)
        return newUser
    }

    update(id: number, updateUserDto: UpdateUserDto){
        this.users = this.users.map((user) => {
            if(user.id === id){
                return { ...user, ...updateUserDto }
            }
            return user
        })   
        return this.findOne(id)
    }

    delete(id: number){
        const removedUser = this.findOne(id)
        this.users = this.users.filter(user => user.id !== id)
        return removedUser
    }
}
