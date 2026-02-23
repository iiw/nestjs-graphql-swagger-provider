/* eslint-disable */
import { InputType, Field, Float } from '@nestjs/graphql';

@InputType()
export class PostAddressesInputPayment {
  @Field(() => [ScriptValue], { description: 'Script primitive for which all signing keys corresponding to all list elements\' verification keys are expected to make the script valid.' })
  all?: ScriptValue[];

  @Field(() => [ScriptValue], { description: 'Script primitive for which a signing key corresponding to any of the list elements\' verification keys is expected to make the script valid. It is equivalent to `some` with `"at_least"=1`.' })
  any?: ScriptValue[];

  @Field(() => PostAddressesInputPaymentSome, { description: 'Script primitive for which at least a given number of signing keys corresponding to the list elements\' verification keys are expected to make the script valid.' })
  some?: PostAddressesInputPaymentSome;
}

@InputType()
export class PostAddressesInputPaymentSome {
  @Field(() => Float)
  at_least!: number;

  @Field(() => [ScriptValue])
  from!: ScriptValue[];
}

@InputType()
export class PostAddressesInputStake {
  @Field(() => [ScriptValue], { description: 'Script primitive for which all signing keys corresponding to all list elements\' verification keys are expected to make the script valid.' })
  all?: ScriptValue[];

  @Field(() => [ScriptValue], { description: 'Script primitive for which a signing key corresponding to any of the list elements\' verification keys is expected to make the script valid. It is equivalent to `some` with `"at_least"=1`.' })
  any?: ScriptValue[];

  @Field(() => PostAddressesInputStakeSome, { description: 'Script primitive for which at least a given number of signing keys corresponding to the list elements\' verification keys are expected to make the script valid.' })
  some?: PostAddressesInputStakeSome;
}

@InputType()
export class PostAddressesInputStakeSome {
  @Field(() => Float)
  at_least!: number;

  @Field(() => [ScriptValue])
  from!: ScriptValue[];
}

@InputType()
export class ScriptValueSome {
  @Field(() => Float)
  at_least!: number;

  @Field(() => [ScriptValue])
  from!: ScriptValue[];
}

@InputType()
export class PostAddressesInput {
  @Field(() => PostAddressesInputPayment)
  payment?: PostAddressesInputPayment;

  @Field(() => PostAddressesInputStake)
  stake?: PostAddressesInputStake;
}

@InputType()
export class ScriptValue {
  @Field(() => [ScriptValue], { description: 'Script primitive for which all signing keys corresponding to all list elements\' verification keys are expected to make the script valid.' })
  all?: ScriptValue[];

  @Field(() => [ScriptValue], { description: 'Script primitive for which a signing key corresponding to any of the list elements\' verification keys is expected to make the script valid. It is equivalent to `some` with `"at_least"=1`.' })
  any?: ScriptValue[];

  @Field(() => ScriptValueSome, { description: 'Script primitive for which at least a given number of signing keys corresponding to the list elements\' verification keys are expected to make the script valid.' })
  some?: ScriptValueSome;
}
