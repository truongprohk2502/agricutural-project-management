import {
    registerDecorator,
    ValidationOptions,
    ValidatorConstraint,
    ValidatorConstraintInterface,
    ValidationArguments,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsPhoneConstraint implements ValidatorConstraintInterface {
    validate(phone: any, args: ValidationArguments) {
        return phone.match(/^[0-9]+$/) !== null
    }
}

export function IsPhone(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsPhoneConstraint,
        });
    };
}