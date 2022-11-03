import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table, Scopes, HasOne, BelongsToMany } from "sequelize-typescript";
import * as bcrypt from 'bcryptjs';
import { Op } from "sequelize";
import { QueryUtil } from "../../utils/query.util";
import { Inventory } from "./inventory.model";
import { Friend } from "./friend.model";

@Scopes(() => ({
    query: QueryUtil.query(['id', 'name', 'mail']),
    inventory: {
        include: [Inventory]
    },
    friend: {
        include: [User]
    }
}))
@Table
export class User extends Model<User> {
    @PrimaryKey
    @AutoIncrement
    @Column(DataType.INTEGER)
    id!: number;

    @Column(DataType.STRING(32))
    name!: string;

    @Column(DataType.STRING)
    get password(): string {
        return this.getDataValue('password');
    };
    set password(value: string) {
        this.setDataValue('password', bcrypt.hashSync(value, 8));
    };

    @Column(DataType.STRING(128))
    mail!: string;

    @HasOne(() => Inventory)
    inventory?: Inventory;

    @BelongsToMany(() => User, () => Friend)
    friends?: User[];
}