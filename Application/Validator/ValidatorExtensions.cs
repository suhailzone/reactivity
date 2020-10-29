using FluentValidation;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Validator
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                .NotEmpty()
                .MinimumLength(6).WithMessage("Password must be at least 6 characters")
                .Matches("[A-Z]").WithMessage("Password must contains 1 UpperCase letter")
                .Matches("[a-z]").WithMessage("Password must have atlest 1 lower case")
                .Matches("[0-9]").WithMessage("Password must contain a number")
                .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain non alphanumeric");
            
            return options;
        }
    }
}
