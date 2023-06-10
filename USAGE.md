# Usage

## Prefer undefined to null

- `null` is an explicitly assigned value that represents the deliberate absence of an object value, while `undefined` represents a variable that has been declared but has not been assigned a value. This means that `null` can be misleading or confusing when used in a data model, as it implies that the property or variable exists but has no value, while `undefined` implies that the property or variable has not been initialized or set at all.

- TypeScript has a feature called **optional properties** that allows you to mark a property as optional by adding a question mark (?) after its name. This means that the property can be omitted or assigned `undefined`, but not `null`.

- TypeScript also has a feature called **strict null checks** that enables you to avoid common errors related to `null` and `undefined`. When this feature is enabled, `null` and `undefined` are only assignable to themselves and any (the top type). This means that you cannot assign `null` or `undefined` to other types like numbers, strings, etc.

- Using `undefined` instead of `null` can also make your code more consistent with JavaScript's built-in functions and operators. For example, the typeof operator returns `"undefined"` for variables that have not been assigned a value, and the optional chaining operator (?.) short-circuits if the left-hand side is `null` or `undefined`.
