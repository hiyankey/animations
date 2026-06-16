"use client";

import {
  Content,
  Item,
  List,
  Root,
  Trigger,
  Viewport,
} from "@radix-ui/react-navigation-menu";
import { MotionConfig } from "motion/react";
import "./styles.css";
import { ChevronDownIcon } from "@/app/ui/icons/chevron-down";

export default function Page() {
  return (
    <MotionConfig transition={{ type: "spring", duration: 0.5, bounce: 0.15 }}>
      <div className="min-h-dvh flex-center">
        <div className="relative aspect-2/1 w-240 flex-center rounded-24 bg-demo-bg">
          <Root className="relative">
            <List className="flex items-center gap-6">
              <Item>
                <Trigger className="group flex items-center gap-1.5">
                  <span className="text-14">Overview</span>
                  <span className="inline-block group-data-[state=open]:rotate-180">
                    <ChevronDownIcon />
                  </span>
                </Trigger>
                <Content className="content absolute top-0 left-0 w-auto p-1.5">
                  <div className="grid w-90 grid-cols-2 gap-1.5 text-14">
                    <div className="flex flex-col gap-1 p-1">
                      <span>Iteration</span>
                      <span className="text-12 text-gray-11">
                        Iteration is a next generation design practice combining
                        creativity, craft, and computation to help founders snap
                        ideas into focus—fast.
                      </span>
                    </div>

                    <div className="rounded-8 bg-gray-4" />
                  </div>
                </Content>
              </Item>

              <Item>
                <Trigger className="group flex items-center gap-1.5">
                  <span className="text-14">Docs</span>
                  <span className="inline-block group-data-[state=open]:rotate-180">
                    <ChevronDownIcon />
                  </span>
                </Trigger>
                <Content className="content absolute top-0 left-0 w-auto p-1.5">
                  <div className="w-90 text-14">
                    <ul className="grid grid-cols-2 gap-1 [&_li]:flex [&_li]:cursor-pointer [&_li]:flex-col [&_li]:rounded-8 [&_li]:px-2.5 [&_li]:py-1.5 [&_li]:hover:bg-gray-4">
                      <li>
                        <span>Guide</span>
                        <span className="text-12 text-gray-11">
                          Quick setup steps
                        </span>
                      </li>
                      <li>
                        <span>Agents</span>
                        <span className="text-12 text-gray-11">
                          How to integrate agents
                        </span>
                      </li>
                      <li>
                        <span>Misc</span>
                        <span className="text-12 text-gray-11">
                          Helpful notes and tips
                        </span>
                      </li>
                    </ul>
                  </div>
                </Content>
              </Item>

              <Item>
                <span className="cursor-pointer text-14">Updates</span>
              </Item>
            </List>
            <div className="absolute top-full left-1/2 flex max-w-max flex-1 -translate-x-1/2">
              <Viewport className="viewport relative mx-auto mt-2.5 h-(--radix-navigation-menu-viewport-height) w-(--radix-navigation-menu-viewport-width) overflow-hidden rounded-12 bg-white shadow-menu transition-[width,height] duration-200 ease-overlay dark:bg-gray-2" />
            </div>
          </Root>
        </div>
      </div>
    </MotionConfig>
  );
}
