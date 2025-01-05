"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/navbar";
import Sidebar from "@/components/sidebar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { formatDistanceToNow } from "date-fns";
import { LinkIcon, SendHorizonal, Star } from "lucide-react";
import Image from "next/image";
import { cn, getTokenInfo } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Markdown from "react-markdown";
import { ModifiedResponse } from "@/lib/utils";
import { LoadingState } from "@/components/loading";
import { Toaster, toast } from "sonner";
const FeaturedCoins = [
  {
    name: "Fartcoin",
    src: "/fartcoin.png",
    ca: "9BB6NFEcjBCtnNLFko2FqVQBq8HHM13kCyYcdQbgpump",
  },
  {
    name: "Bonk",
    src: "/bonk.png",
    ca: "0x1151CB3d861920e07a38e03eEAd12C32178567F6",
  },

  {
    name: "PENGU",
    src: "/pengu.png",
    ca: "2zMMhcVQEXDtdE6vsFS7S7D5oUodfJHE8vd1gnBouauv",
  },
  {
    name: "swarms",
    src: "/swarms.png",
    ca: "74SBV4zDXxTRgv1pEMoECskKBkZHc2yGPnc7GYVepump",
  },
  {
    name: "ai16z",
    src: "/ai16z.png",
    ca: "HeLp6NuQkmYB4pYWo2zYs22mESHXPQYzXbB8n4V98jwC",
  },
  {
    name: "ZEREBRO",
    src: "/ZEROBRO.png",
    ca: "8x5VqbHA8D7NkD52uNuS5nnt3PwA8pLD34ymskeSo2Wn",
  },
];

export default function ATS() {
  const [openSection, setOpenSection] = useState<boolean>(true);
  const [inputValue, setInputValue] = useState<string>("");
  const [messages, setMessages] = useState<
    { userMsg: string; botMsg: ModifiedResponse; timeStamp: Date }[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [recentSearch, setRecentSearch] = useState<{ text: string }[]>([]);
  const handleMsg = async () => {
    if (isLoading) return;
    if (inputValue.trim() === "") {
      // toast({
      //   title: "Error",
      //   description: "Please paste a token address",
      //   variant: "destructive",
      // });
      return;
    }

    setOpenSection(false);
    setIsLoading(true);

    const response = await getTokenInfo(inputValue);
    console.log(response);

    const newMessage = {
      userMsg: inputValue,
      botMsg: response,
      timeStamp: new Date(),
    };

    setRecentSearch((prev) => {
      return [
        {
          text: response?.tokenDetails?.tokenName,
          src: response?.socialsData?.imageUrl,
        },
        ...prev,
      ];
    });

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setInputValue("");
    setIsLoading(false);
  };

  const handlePaste = () => {
    navigator.clipboard.readText().then((text) => {
      setInputValue(text);
    });
  };
  const latestMsgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (latestMsgRef.current) {
      latestMsgRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  }, [messages]);

  return (
    <div className="w-full relative lg:px-[42px] px-5 h-svh flex flex-col overflow-x-hidden">
      <Toaster richColors />
      <div className="bg-[#9559f526] w-1/2 h-full absolute md:-right-[5%] -right-[20%]  rounded-[1573px] blur-[310px] " />
      <Navbar recentSearch={recentSearch} />
      <div className="w-full  md:grid lg:grid-cols-6 md:grid-cols-4 relative grow overflow-hidden  gap-2 mt-6">
        <Sidebar
          recentSearch={recentSearch}
          className={cn(
            "absolute  w-[187px] lg:w-[209px] h-full lg:relative max-h-[90%] lg:flex overflow-y-auto",
            !openSection && "hidden lg:flex"
          )}
        />

        <div className="col-span-4  flex h-full    w-full relative overflow-y-auto   items-center no-scrollbar  flex-col  md:justify-between justify-start">
          <AnimatePresence mode="wait">
            {openSection ? (
              <motion.div
                key="featured-coins"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full flex  md:items-center items-start  md:grow justify-center md:gap-2 gap-10 flex-col"
              >
                <div className="w-full md:flex hidden px-10 items-center justify-between md:scale-90">
                  <button onClick={() => setInputValue(FeaturedCoins[0].ca)}>
                    <Badge
                      text={FeaturedCoins[0].name}
                      src={FeaturedCoins[0].src}
                      className="w-[140px] ]"
                    />
                  </button>
                  <button onClick={() => setInputValue(FeaturedCoins[1].ca)}>
                    <Badge
                      text={FeaturedCoins[1].name}
                      src={FeaturedCoins[1].src}
                      className="w-[140px]"
                    />
                  </button>
                </div>
                <div className="relative">
                  <Image
                    alt="hero"
                    src="/center.png"
                    width={700}
                    height={254}
                    className="object-contain relative md:w-[450px] md:h-[230px] "
                  />
                  <div className="w-full hidden md:flex justify-between items-center absolute  px-[20%] bottom-[20px]">
                    <Image alt="zap" src={"/zap.png"} width={30} height={30} />

                    <Image alt="zap" src={"/zap.png"} width={30} height={30} />
                  </div>
                </div>
                <div className="w-full md:hidden flex  relative items-center justify-between scale-90">
                  <button onClick={() => setInputValue(FeaturedCoins[2].ca)}>
                    <Badge
                      text={FeaturedCoins[2].name}
                      src={FeaturedCoins[2].src}
                      className="w-[140px]"
                    />
                  </button>
                  <button onClick={() => setInputValue(FeaturedCoins[3].ca)}>
                    <Badge
                      text={FeaturedCoins[3].name}
                      src={FeaturedCoins[3].src}
                      className="w-[140px]"
                    />
                  </button>
                </div>
                <div className="w-full md:absolute mb-3 flex items-center md:justify-between justify-center">
                  <button onClick={() => setInputValue(FeaturedCoins[4].ca)}>
                    <Badge
                      text={FeaturedCoins[4].name}
                      src={FeaturedCoins[4].src}
                      className="w-[140px] hidden md:flex"
                    />
                  </button>
                  <button onClick={() => setInputValue(FeaturedCoins[5].ca)}>
                    <Badge
                      text={FeaturedCoins[5].name}
                      src={FeaturedCoins[5].src}
                      className="w-[140px]"
                    />
                  </button>
                </div>
                <div className="w-full flex md:px-10 mt-3 md:mt-0 items-center justify-between">
                  <button onClick={() => setInputValue(FeaturedCoins[2].ca)}>
                    <Badge
                      text={FeaturedCoins[2].name}
                      src={FeaturedCoins[2].src}
                      className="w-[140px]"
                    />
                  </button>
                  <button onClick={() => setInputValue(FeaturedCoins[3].ca)}>
                    <Badge
                      text={FeaturedCoins[3].name}
                      src={FeaturedCoins[3].src}
                      className="w-[140px]"
                    />
                  </button>
                </div>
                <div className=" min-[1340px]:flex w-full hidden gap-2 justify-center items-center mt-2">
                  <div className="w-4 aspect-square rounded-full bg-white " />
                  <div className="w-4 aspect-square rounded-full bg-white/60 " />
                  <div className="w-4 aspect-square rounded-full bg-white/30 " />
                </div>
              </motion.div>
            ) : isLoading && messages.length < 1 ? (
              <LoadingState />
            ) : (
              <motion.div
                key="message-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full h-full overflow-y-auto no-scrollbar"
              >
                {messages.map((msg, index) => (
                  <MsgContainer
                    ref={latestMsgRef}
                    key={index}
                    botMsg={msg.botMsg}
                    userMsg={msg.userMsg}
                    timeStamp={msg.timeStamp}
                    isLoading={isLoading}
                  />
                ))}
                {/* <div ref={bottomRef} /> */}
              </motion.div>
            )}
          </AnimatePresence>

          <div className=" md:relative absolute  backdrop-blur-md bottom-4 w-full  lg:max-w-[800px] md:max-w-[600px] ">
            <Star
              className="absolute left-4 top-[17px] fill-[#FFCF21]"
              size={10}
              stroke="#FFCF21"
            />
            <Button
              onClick={handleMsg}
              size={"icon"}
              variant={"ghost"}
              disabled={inputValue.trim() === "" || isLoading}
              className="bg-white/20 w-10 right-2 absolute top-[4px] hover:bg-white/30 transition-colors duration-150   h-10 rounded-full"
            >
              <SendHorizonal className="w-5 h-5  fill-white" size={2} />
            </Button>

            <Input
              className=" p-2 pl-8 py-3 rounded-full mx-auto self-center  bg-white/5 w-full  border border-white/5"
              placeholder="Paste Contract Address here"
              value={inputValue}
              readOnly={isLoading}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyUp={(e) => {
                if (e.key === "Enter") {
                  handleMsg();
                }
              }}
            />
            <Button
              size={"icon"}
              variant={"ghost"}
              onClick={handlePaste}
              className="bg-white/20 w-10 h-10 rounded-full backdrop-blur-3xl absolute hover:bg-white/30 transition-colors duration-150 right-12 md:right-16 top-[4px]"
            >
              <Image
                alt="paste"
                src="/paste.svg"
                width={30}
                height={30}
                className="w-[26px] h-[26px] "
              />
            </Button>
          </div>
        </div>
        <Sidebar
          recentSearch={recentSearch}
          className={cn(
            "absolute  w-[187px] lg:w-[209px] h-full lg:relative max-h-[90%] overflow-y-auto",
            !openSection && "hidden lg:flex"
          )}
        />
      </div>
    </div>
  );
}
function MsgContainer({
  botMsg,
  userMsg,
  timeStamp,
  isLoading,
  ref,
}: {
  botMsg: ModifiedResponse;
  userMsg: string;
  timeStamp: Date;
  isLoading?: boolean;
  ref?: React.Ref<HTMLDivElement>;
}) {
  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("copied");
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      ref={ref}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="w-full flex flex-col-reverse md:max-w-[90%] mx-auto gap-6 md:px-4 py-6 pb-20"
    >
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="w-full flex gap-3 items-start"
      >
        <div className="flex-1 md:flex items-center relative md:gap-3 gap-5 justify-center">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white/5 p-4 rounded-2xl border border-white/5 overflow-hidden"
          >
            <span className="text-white/90 text-sm break-words leading-relaxed">
              <Markdown>{`${botMsg?.AIresponse}`}</Markdown>
            </span>
            {!botMsg?.error && (
              <div className=" flex items-center justify-start absolute md:-bottom-8 bottom-2 w-full gap-3">
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.6,
                  }}
                  className={cn(
                    "bg-white/20 md:text-sm  text-[10px] w-fit px-3 py-1 text-white rounded-full flex gap-2",
                    botMsg?.tokenDetails?.isHoneyPot &&
                      "text-white/30 scale-70 opacity-45"
                  )}
                >
                  <Image
                    src="/honeypot.svg"
                    alt="Honeypot"
                    width={16}
                    height={16}
                  />
                  <span>Honeypot</span>
                </motion.span>
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.7,
                  }}
                  className={cn(
                    "bg-white/20 md:text-sm  text-[10px] w-fit px-3 py-1 text-white rounded-full flex gap-2",
                    !botMsg?.tokenDetails?.isHoneyPot &&
                      "text-white/30 scale-70 opacity-45"
                  )}
                >
                  <Image
                    src="/safe.svg"
                    alt="Honeypot"
                    width={16}
                    height={16}
                  />
                  <span>Safe to Buy</span>
                </motion.span>
              </div>
            )}
            <span className="absolute md:-bottom-8 bottom-2 right-12 text-sm">
              {formatDistanceToNow(timeStamp, {
                addSuffix: false,
              }) == "less than a minute"
                ? "just now"
                : formatDistanceToNow(timeStamp, {
                    addSuffix: true,
                  })}
            </span>
          </motion.div>
          {!botMsg?.error && (
            <div className="flex gap-1 mt-2 relative -bottom-8 md:mt-0 md:flex-col pb-20 justify-center items-center">
              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-150"
                )}
              >
                <Image src="/share.svg" alt="Share" width={16} height={16} />
              </Button>
              <Button
                size="icon"
                onClick={() => handleCopy(botMsg.AIresponse)}
                variant="ghost"
                className={cn(
                  "w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-150 "
                )}
              >
                <Image src={"/copy.svg"} alt={"copy"} width={16} height={16} />
              </Button>

              <Button
                size="icon"
                variant="ghost"
                className={cn(
                  "w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-150  mr-2 md:mb-2 md:mr-0"
                )}
              >
                <a href={botMsg?.socialsData?.website} target="_blank">
                  <LinkIcon />
                </a>
              </Button>

              {[
                {
                  src: "/pump.svg",
                  alt: "pump",
                  href: botMsg?.socialsData?.pump,
                },

                {
                  src: "/x.svg",
                  alt: "X",
                  href: botMsg?.socialsData?.socials?.find(
                    (o) => o.type.toLowerCase() == "twitter" || o.type == "x"
                  )?.url,
                },
                {
                  src: "/dex-white.svg",
                  alt: "DEX",
                  href: botMsg?.socialsData?.dex,
                },
              ].map((icon, index) => (
                <motion.div
                  key={icon.alt}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 20,
                    delay: 0.5 + index * 0.1,
                  }}
                >
                  <Button
                    size="icon"
                    variant="ghost"
                    className={cn(
                      "w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 transition-colors duration-150 ",
                      index === 1 && " mr-2 md:mb-2 md:mr-0"
                    )}
                  >
                    <a href={icon?.href || ""} target="_blank">
                      <Image
                        src={icon.src}
                        alt={icon.alt}
                        width={16}
                        height={16}
                      />
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full flex gap-3 items-start justify-end"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.3 }}
          className="w-fit bg-white/5 p-4 rounded-s-full rounded-tr-full border border-white/5 overflow-hidden break-words max-w-full"
        >
          <span className="text-white/90 text-sm break-words leading-relaxed">
            {userMsg}
          </span>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
