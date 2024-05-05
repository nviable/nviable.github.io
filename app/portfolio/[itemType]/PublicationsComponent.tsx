'use client';
import React from "react";
import * as Accordion from '@radix-ui/react-accordion';
import { PublicationsData } from "@/app/customTypes";
import { faArrowUpRightFromSquare, faCopy, faCalendar, faUser, faBook } from '@fortawesome/free-solid-svg-icons';
import { AccordionItem, AccordionHeader, AccordionTrigger, AccordionContainer } from '@/app/components/Accordion';
import Button from '@/app/components/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Pill from "@/app/components/Pill";

interface PortfolioComponentProps {
    data: PublicationsData[];
}

export default function PortfolioComponent(params: PortfolioComponentProps) {

    // async function to copy text to clipboard
    async function copyToClipboard(text: string | undefined) {
        if (!text) {
            return;
        }
        try {
            await navigator.clipboard.writeText(text);
            alert("Copied to clipboard!");
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    }

    const content = params.data.map((itemData, i) => {
        const { title, slug, description, authors, date, url, bibtex, tags, project, awards, media, venue, category, code } = itemData;

        const authorsList = authors?.map((author, i) => {
            return <li key={slug + "-author-" + i}>
                <FontAwesomeIcon icon={faUser} className="w-4 h-4 inline-block" />{author}
            </li>;
        });

        const tagsList = tags?.map((tag, i) => {
            return <Pill key={slug + "-tag-" + i} >{tag}</Pill>;
        });
        return (
            <AccordionItem key={slug + "-accordion-item"} className="accordion-item" value={"item-" + i}>
                <AccordionHeader>
                    <AccordionTrigger>
                        {title}
                    </AccordionTrigger>
                </AccordionHeader>
                <AccordionContainer>
                    <ul>{authorsList}</ul>
                    <p><FontAwesomeIcon className="w-4 h-4 inline-block" icon={faCalendar} />{date}</p>
                    <p><FontAwesomeIcon className="w-4 h-4 inline-block" icon={faBook} />{venue}</p>
                    <p>{category}</p>
                    {tagsList}
                    <p>{project}</p>
                    <p>{description}</p>
                    <p>{awards}</p>
                    <p>{media}</p>
                    <Button onClick={() => copyToClipboard(bibtex)} icon={faCopy}>Copy Bibtex</Button>
                    <Button url={url} icon={faArrowUpRightFromSquare} target="_blank">Paper URL</Button>
                    <p>{code}</p>
                </AccordionContainer>
            </AccordionItem>
        );
    });
    return (
        <div>
            <p>A bunch of publications here</p>
            <Accordion.Root type="single" defaultValue="item-0" collapsible>
                {content}
            </Accordion.Root>
        </div>
    );
}
