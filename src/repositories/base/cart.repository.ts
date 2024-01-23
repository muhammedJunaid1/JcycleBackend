import { HttpException, HttpStatus, Inject } from "@nestjs/common";
import { Model } from "mongoose";
import { CreateUserDto } from "src/users/dto/create-user.dto";
import { cart } from "src/users/entities/user.entity";
import { ICartRepository } from "../interfaces/cart-repostiory.interface";


export class cartRepository implements ICartRepository {
  constructor(
    @Inject('CART_MODEL')
    private _cartModel: Model<cart>,
  ) { }

  async cart(id: string):Promise<cart> {

    try {
      return this._cartModel.findOne({ user: id }).populate('product.id').populate('user')
    } catch (error) {
      console.log(error);

    }
  }

  async addCart(id: string, user: string, price: number):Promise<cart> {


    const exist = await this._cartModel.findOne({ user: user })
    if (exist) {
      const existProduct = await this._cartModel.findOne({ user: user, 'product.id': id })
      if (existProduct) {
        throw new HttpException(
          'already added',
          HttpStatus.FOUND
        )
      } else {
        
        
        return await this._cartModel.findOneAndUpdate({ user: user }, { $push: { product: { id: id, count: 1 } }, $inc: { TotalAmount: price } })
      }
    } else {



      const data = new this._cartModel({
        user: user,
        product: [
          {
            id: id,
            count: 1,
          }
        ],
        TotalAmount: price
      })
      
       
      return await data.save()
    }
  }
  async cartRemove(id: string, user: string, price: number, count: number):Promise<cart> {
    const exist = await this._cartModel.findOne({ user: user })
    if (exist) {
      return await this._cartModel.findOneAndUpdate({ user: user }, { $pull: { product: { id: id } }, $inc: { TotalAmount: -price * count } })

    }
  }

  async cartUpdate(user: string, id: string, count: number, price: number):Promise<cart> {

    console.log(price);

    return await this._cartModel.findOneAndUpdate({ user: user, 'product.id': id }, { $set: { 'product.$.count': count }, $inc: { TotalAmount: price } })
  }
}