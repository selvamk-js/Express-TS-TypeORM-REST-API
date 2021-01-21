import { Service } from 'typedi';
import { OrmRepository } from 'typeorm-typedi-extensions';
// import uuid from 'uuid';

// import {
//   EventDispatcher,
//   EventDispatcherInterface,
// } from '../../decorators/EventDispatcher';
import { Logger, LoggerInterface } from '../../decorators/Logger';
import { Customer } from '../models/Customer';
import { CustomerRepository } from '../repositories/CustomerRepository';
// import { events } from '../subscribers/events';

@Service()
export class CustomerService {
  constructor(
    @OrmRepository() private customerRepo: CustomerRepository,
    // @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    @Logger(__filename) private log: LoggerInterface
  ) {}

  public find(): Promise<Customer[]> {
    this.log.info('Find all users');
    return this.customerRepo.find();
  }

  public findOne(customerNumber: number): Promise<Customer | undefined> {
    this.log.info('Find one user');
    return this.customerRepo.findOne({ customerNumber });
  }

  //   public async create(user: Customer): Promise<Customer> {
  //     this.log.info('Create a new user => ', user.toString());
  //     user.id = uuid.v1();
  //     const newUser = await this.customerRepo.save(user);
  //     this.eventDispatcher.dispatch(events.user.created, newUser);
  //     return newUser;
  //   }

  public update(customerNumber: number, customer: Customer): Promise<Customer> {
    this.log.info('Update a user');
    const cus = customer;
    cus.customerNumber = customerNumber;
    return this.customerRepo.save(cus);
  }

  public async delete(id: string): Promise<void> {
    this.log.info('Delete a user');
    await this.customerRepo.delete(id);
  }
}
