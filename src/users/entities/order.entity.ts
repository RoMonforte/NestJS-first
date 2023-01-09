import {Column, Entity } from "typeorm";

import { User } from "./user.entity";
import { Product } from "src/products/entities/product.entity";

@Entity()
export class Order {
  @Column({type: 'date',})
  date: Date;

  @Column({type: 'varchar',})
  user: User;

  @Column({type: 'array',})
  products: Product[];
}
