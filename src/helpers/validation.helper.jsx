export const validateField = (
    schema,
    name,
    value,
    validateMessages = {}
) => {
    console.log({ schema: schema, name: name, value: value, validateMessages: validateMessages });

    const errors = { ...validateMessages };

    const fieldSchema = schema.shape[name];
    console.log({ fieldSchema: fieldSchema });

    if (fieldSchema) {
        const result = fieldSchema.safeParse(value);
        console.log({ result: result });

        if (!result.success) {
            errors[name] = result.error.issues[0].message;
        } else {
            delete errors[name];
        }
    }

    return errors;
};

export const validateForm = (schema, data) => {
    const result = schema.safeParse(data);

    const errors = {};

    if (!result.success) {
        result.error.issues.forEach((issue) => {
            const field = issue.path[0];

            if (field && !errors[field]) {
                errors[field] = issue.message;
            }
        });
    }
    console.log("errors------------", result);

    return errors;
};