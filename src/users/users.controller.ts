import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Query, UseInterceptors, UploadedFiles } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, rentdto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Response, query } from 'express';
import { log } from 'console';
import { get } from 'http';
import { address, rent } from './entities/user.entity';
import { FileFieldsInterceptor } from '@nestjs/platform-express';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) { }

  @Post('SignUp')
  async SignUp(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.usersService.SignUp(createUserDto, res);
  }
  @Patch('verified')
  async verifiedUser(@Query('id') id: string) {

    return this.usersService.verified(id)
  }

  @Get('otpVerification')
  async sendMail(@Query('id') id: string, @Res() res: Response) {
    return this.usersService.sendMail(res, id);
  }


  @Post('SignIn')
  SignIn(@Body() createUserDto: CreateUserDto, @Res() res: Response) {
    return this.usersService.signIn(createUserDto, res);
  }



  @Get('userDetails')
  findcategoryDetails(@Query('id') id: string) {
    return this.usersService.userDetails(id);
  }

  @Post('cart')
  addCart(@Body() cartdata: CreateUserDto) {

    return this.usersService.addcart(cartdata)

  }
  @Post('wishlist')
  addwishlist(@Body() wishlistdata: CreateUserDto) {
    return this.usersService.addwishlist(wishlistdata)
  }

  @Get('wishlist')
  wishlist(@Query() user: string) {
    return this.usersService.wishlist(user)
  }
  @Get('cart')
  cart(@Query() user: string) {
    return this.usersService.cart(user)
  }
  @Patch('cart')
  cartRemove(@Body() data: CreateUserDto) {
    return this.usersService.cartRemove(data)
  }
  @Patch('cartUpdate')
  cartUpdate(@Body() data: CreateUserDto) {
    console.log(data);


    return this.usersService.cartUpdate(data)
  }

  @Post('cheakout')
  addOrder(@Body() data: any) {

    return this.usersService.addOrder(data)
  }
  @Get('order')
  loadOrder(@Query() id: string) {
    console.log(id);

    return this.usersService.loadOrder(id)
  }

  @Patch('orderStatus')
  orderStatusUpdate(@Body() data: any) {

    return this.usersService.orderStatusUpdate(data)

  }
  @Get('wallet')
  loadWallet(@Query() id: string) {
    return this.usersService.loadWallet(id)
  }
  @Post('review')
  addReview(@Body() data: any) {
    return this.usersService.addReview(data)
  }


  @Get('review')
  Review(@Query() id: string) {
    return this.usersService.Review(id)
  }
  @Get('userData')
  userData(@Query() user: string) {
    return this.usersService.userData(user)
  }
  @Post('updateName')
  updateName(@Query() user: string, @Body() name: string) {


    return this.usersService.updateName(user, name)
  }

  @Post('rent-add')
  @UseInterceptors(FileFieldsInterceptor([{ name: 'image', maxCount: 6 }]))
  rent_add(@Req() req: Request,
    @Res() res: Response,
    @Body() rent_data: rent,
    @UploadedFiles() files: Array<Express.Multer.File>,) {
    files = files['image']
    this.usersService.addrent(rent_data, files)

  }

  @Get('loadRentBicycle')
  loadRentBicycle(@Query('user') user: string) {
    return this.usersService.loadRentBicycle()
  }
  @Post('address')
  addAddress(@Body('address') addressData:address,@Body('user') user:string ){
  return this.usersService.addAddress(addressData,user)
  }
  @Get('address')
  Address(@Query('id') user:string ){
  return this.usersService.Address(user)
  }

}
