import { IsNotEmpty } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

// import { User } from './User';

@Entity('customers')
export class Customer {
  @PrimaryColumn('int')
  public customerNumber: number;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50 })
  public customerName: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50 })
  public contactLastName: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50 })
  public contactFirstName: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50 })
  public phone: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50 })
  public addressLine1: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50, nullable: true })
  public addressLine2: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50 })
  public city: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  public state: string;

  @Column({ type: 'varchar', length: 15, nullable: true })
  public postalCode: string;

  @IsNotEmpty()
  @Column({ type: 'varchar', length: 50 })
  public country: string;

  @Column({ type: 'int', nullable: true })
  public salesRepEmployeeNumber: number;

  @Column({
    type: 'decimal',
    nullable: true,
    precision: 10,
    scale: 2,
  })
  public creditLimit: number;

  //   @ManyToOne(type => User, user => user.pets)
  //   @JoinColumn({ name: 'user_id' })
  //   public user: User;

  public toString(): string {
    return `${this.customerName}`;
  }
}
