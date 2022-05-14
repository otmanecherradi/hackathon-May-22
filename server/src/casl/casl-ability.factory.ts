import {
  Ability,
  AbilityBuilder,
  AbilityClass,
  ExtractSubjectType,
  InferSubjects,
} from '@casl/ability';
import { Injectable } from '@nestjs/common';
import { User, Role } from '@prisma/client';

import { PrismaService } from '../shared/prisma/prisma.service';

import { Action } from './action.enum';

type Subjects = InferSubjects<User | Role> | 'all';

export type AppAbility = Ability<[Action, Subjects]>;

@Injectable()
export class CaslAbilityFactory {
  constructor(private readonly prismaService: PrismaService) {}

  async createForUser(user: User) {
    const { can, cannot, build } = new AbilityBuilder<
      Ability<[Action, Subjects]>
    >(Ability as AbilityClass<AppAbility>);

    const roles = await (
      await this.prismaService.role.findMany()
    ).reduce((a, c) => ({ ...a, [c.name]: c }), {});

    console.log(roles);

    if (user.roleId) {
      can(Action.Manage, 'all'); // read-write access to everything
    } else {
      can(Action.Read, 'all'); // read-only access to everything
    }

    // can(Action.Update, Article, { authorId: user.id });
    // cannot(Action.Delete, Article, { isPublished: true });

    return build({
      detectSubjectType: (item) =>
        item.constructor as unknown as ExtractSubjectType<Subjects>,
    });
  }
}
