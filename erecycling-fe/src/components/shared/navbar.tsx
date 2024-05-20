import React, { useState } from "react";
import { MdOutlineViewHeadline } from "react-icons/md";
import type { MenuProps } from "antd";
import { AiFillSetting } from "react-icons/ai";
import { Dropdown, Badge, Button, Drawer, Avatar, Image } from "antd";
import { BiBell } from "react-icons/bi";
import { useGetAuth } from "@/lib/react-query/query";
import { getFullName } from "@/utils/app-utils";

const items: MenuProps["items"] = [
  {
    label: "English",
    style: {
      display: "flex",
      gap: 5,
    },
    icon: (
      <Image
        src={"/images/english.svg"}
        alt="uk"
        width={26}
        height={22}
        style={{ borderRadius: "6px" }}
        preview={false}
      />
    ),
    key: "english",
  },
  {
    label: "Tiếng Việt",
    style: {
      display: "flex",
      gap: 5,
    },
    icon: (
      <Image
        src={"/images/vietnamese.svg"}
        alt="uk"
        width={26}
        height={22}
        style={{ borderRadius: "6px" }}
        preview={false}
      />
    ),
    key: "vietnamese",
  },
  {
    label: "Français",
    style: {
      display: "flex",
      gap: 5,
    },
    icon: (
      <Image
        src={"/images/france.svg"}
        alt="uk"
        width={26}
        height={22}
        style={{ borderRadius: "6px" }}
        preview={false}
      />
    ),
    key: "france",
  },
];

const Navbar = () => {
  const [lang, setLang] = useState<string>("vietnamese");
  const [open, setOpen] = useState(false);
  const { data: user } = useGetAuth();
  const handleChangeLanguage: MenuProps["onClick"] = (e) => {
    setLang(e.key);
  };

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="z-10 flex w-[calc(100%_-_281px)] justify-between py-4 px-3 border-b border-solid border-[#F0F0F0] fixed top-0 left-auto right-0 h-[64px] backdrop-blur">
      <div className="flex gap-2 items-center">
        <MdOutlineViewHeadline fontSize={22} />
        <span>Home</span>
      </div>
      <div className="flex gap-3 items-center">
        <Dropdown
          menu={{
            items,
            selectable: true,
            onClick: handleChangeLanguage,
          }}
        >
          <div className="rounded w-[50px]">
            <Image
              src={`/images/${lang}.svg`}
              alt={`lag-${lang}`}
              width={"100%"}
              // height={26}
              // sizes="100%"
              // className="rounded-md"
              style={{ borderRadius: "4px" }}
              preview={false}
            />
          </div>
        </Dropdown>

        <div>
          <Badge count={5}>
            <Button type="text" shape="circle" icon={<BiBell fontSize={22} />} />
          </Badge>
        </div>

        <div>
          <Button
            onClick={showDrawer}
            type="text"
            shape="circle"
            icon={<AiFillSetting fontSize={22} />}
          />
          <Drawer
            title="Cài đặt nhanh"
            width={375}
            onClose={onClose}
            open={open}
            placement="right"
          >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
          </Drawer>
        </div>

        <Button
          className="relative flex gap-1 items-center"
          type="text"
          block
          style={{ paddingLeft: 0, paddingRight: 0 }}
        >
          <Avatar className="mx-auto" size={32} src={user.photo} />
          <span className="text-[16px]">{getFullName(user.firstName, user.lastName)}</span>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
