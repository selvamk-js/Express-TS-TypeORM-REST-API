import { IsNotEmpty, IsNumber } from 'class-validator';
import { Get, JsonController, OnUndefined, Param } from 'routing-controllers';
import { OpenAPI, ResponseSchema } from 'routing-controllers-openapi';
import { CustomerNotFoundError } from '../errors/CustomerNotFoundError';
import { Customer } from '../models/Customer';
import { CustomerService } from '../services/CustomerService';

class CustomerBase {
  @IsNotEmpty()
  public customerName: string;

  @IsNotEmpty()
  public contactLastName: string;

  @IsNotEmpty()
  public contactFirstName: string;

  @IsNotEmpty()
  public phone: string;

  @IsNotEmpty()
  public addressLine1: string;

  @IsNotEmpty()
  public addressLine2: string;

  @IsNotEmpty()
  public city: string;

  public state: string;

  public postalCode: string;

  @IsNotEmpty()
  public country: string;

  public salesRepEmployeeNumber: number;

  public creditLimit: number;
}

class CustomerResponse extends CustomerBase {
  @IsNumber()
  @IsNotEmpty()
  public customerNumber: number;
}

@JsonController('/customers')
@OpenAPI({ security: [{ basicAuth: [] }] })
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get()
  @ResponseSchema(CustomerResponse, { isArray: true })
  public find(): Promise<Customer[]> {
    return this.customerService.find();
  }

  @Get('/:customerNumber')
  @OnUndefined(CustomerNotFoundError)
  @ResponseSchema(CustomerResponse)
  public one(
    @Param('customerNumber') customerNumber: number
  ): Promise<Customer | undefined> {
    return this.customerService.findOne(customerNumber);
  }
}
