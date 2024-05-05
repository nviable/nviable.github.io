import * as React from 'react';
import * as AccordionPrimitive from '@radix-ui/react-accordion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export const AccordionItem = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Item>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, forwardedRef) => {
    const newClassName = className + " mt-px overflow-hidden first:mt-0 first:rounded-t last:rounded-b focus-within:relative focus-within:z-10"
    return (
        <AccordionPrimitive.Item className={newClassName} {...props} ref={forwardedRef} />
    )
});
AccordionItem.displayName = 'AccordionItem';

export const AccordionHeader = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Header>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Header>
>(({ className, ...props }, forwardedRef) => {
    const newClassName = className + ""
    return (
        <AccordionPrimitive.Header className={newClassName} {...props} ref={forwardedRef} />
    )
});
AccordionHeader.displayName = 'AccordionHeader';

export const AccordionTrigger = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Trigger>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, ...props }, forwardedRef) => {
    const newClassName = className + " accordion-trigger flex items-center group flex-1 cursor-default justify-between";
    return (
        <AccordionPrimitive.Trigger className={newClassName} {...props} ref={forwardedRef}>
            <h2 className="text-lg">{props.children}</h2>
            <FontAwesomeIcon className="accordion-trigger-icon ease-[cubic-bezier(0.87,_0,_0.13,_1)] transition-transform duration-300 group-data-[state=open]:rotate-180" icon={faChevronDown} />
        </AccordionPrimitive.Trigger>
    )
});
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContainer = React.forwardRef<
    React.ElementRef<typeof AccordionPrimitive.Content>,
    React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content>
>(({ className, ...props }, forwardedRef) => {
    const newClassName = className + " accordion-container data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden text-[15px]";
    return (
        <AccordionPrimitive.Content className={newClassName} {...props} ref={forwardedRef} />
    )
});
AccordionContainer.displayName = 'AccordionContainer';