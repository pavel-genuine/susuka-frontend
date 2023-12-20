'use client';
import React, { useEffect, useState } from 'react';
import Card from '@/components/ui/Card';
import { Icon } from '@iconify/react';
import InputGroup from '@/components/ui/InputGroup';
import { title } from 'process';
import Link from 'next/link';
import { FormattedMessage } from 'react-intl';
const templates = [
    {
        id: 1,
        category: 'Blog',
        templates: [
            {
                id: 1,
                tag: 'Popular',
                title: 'Blog Title',
                description: 'Best Ai title generator',
                icon: 'ant-design:file-pdf-filled',
                color: 'red',
                tagIcon: 'mdi:flame',
                url: '/prompt-writer/blog-title',
            },
            {
                id: 2,
                tag: 'Favorite',
                title: 'Blog Intro',
                description: 'Best Ai Intro generator',
                icon: 'ant-design:file-pdf-filled',
                color: 'orange',
                tagIcon: 'game-icons:self-love',
                url: '/prompt-writer/blog-intro',
            },
            // {
            //   id: 3,
            //   tag: "Favorite",
            //   title: "Blog Intro",
            //   description: "Best Ai Intro generator",
            //   icon: "ant-design:file-pdf-filled",
            //   color: "red",
            //   tagIcon: "game-icons:self-love",
            // },
            // {
            //   id: 4,
            //   tag: "Favorite",
            //   title: "Blog Intro",
            //   description: "Best Ai Intro generator",
            //   icon: "ant-design:file-pdf-filled",
            //   color: "#14A800",
            //   tagIcon: "game-icons:self-love",
            // },
            // {
            //   id: 5,
            //   tag: "Favorite",
            //   title: "Blog Intro",
            //   description: "Best Ai Intro generator",
            //   icon: "ant-design:file-pdf-filled",
            //   color: "red",
            //   tagIcon: "game-icons:self-love",
            // },
        ],
    },
    // {
    //   id: 2,
    //   category: "Ads",
    //   templates: [
    //     {
    //       id: 1,
    //       tag: "Popular",
    //       title: "Blog Title",
    //       description: "Best Ai title generator",
    //       icon: "ant-design:file-pdf-filled",
    //       color: "#14A800",
    //       tagIcon: "mdi:flame",
    //     },
    //     {
    //       id: 2,
    //       tag: "Favorite",
    //       title: "Blog Intro",
    //       description: "Best Ai Intro generator",
    //       icon: "ant-design:file-pdf-filled",
    //       color: "orange",
    //       tagIcon: "game-icons:self-love",
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   category: "Ecommerce",
    //   templates: [
    //     {
    //       id: 1,
    //       tag: "Popular",
    //       title: "Blog Title",
    //       description: "Best Ai title generator",
    //       icon: "ant-design:file-pdf-filled",
    //       color: "#14A800",
    //       tagIcon: "mdi:flame",
    //     },
    //     {
    //       id: 2,
    //       tag: "Favorite",
    //       title: "Blog Intro",
    //       description: "Best Ai Intro generator",
    //       icon: "ant-design:file-pdf-filled",
    //       color: "orange",
    //       tagIcon: "game-icons:self-love",
    //     },
    //   ],
    // },
    // {
    //   id: 4,
    //   category: "Email",
    //   templates: [
    //     {
    //       id: 1,
    //       tag: "Popular",
    //       title: "Blog Title",
    //       description: "Best Ai title generator",
    //       icon: "ant-design:file-pdf-filled",
    //       color: "#14A800",
    //       tagIcon: "mdi:flame",
    //     },
    //     {
    //       id: 2,
    //       tag: "Favorite",
    //       title: "Blog Intro",
    //       description: "Best Ai Intro generator",
    //       icon: "ant-design:file-pdf-filled",
    //       color: "orange",
    //       tagIcon: "game-icons:self-love",
    //     },
    //   ],
    // },
    // {
    //   id: 5,
    //   category: "Marketing",
    //   templates: [
    //     {
    //       id: 1,
    //       tag: "Popular",
    //       title: "Blog Title",
    //       description: "Best Ai title generator",
    //       icon: "ant-design:file-pdf-filled",
    //       color: "#14A800",
    //       tagIcon: "mdi:flame",
    //     },
    //     {
    //       id: 2,
    //       tag: "Favorite",
    //       title: "Blog Intro",
    //       description: "Best Ai Intro generator",
    //       icon: "ant-design:file-pdf-filled",
    //       color: "orange",
    //       tagIcon: "game-icons:self-love",
    //     },
    //   ],
    // },
];

const PrebuidTemplatesPage = () => {
    const [selectedTag, setSelectedTag] = useState('All');
    const [searchText, setSearchText] = useState('');
    const [searchedTemplates, setSearchedTemplates] = useState([]);

    // console.log(selectedTag, "selecedTag");

    // console.log(searchText, "searchText");

    useEffect(() => {
        const results = templates.filter((obj) =>
            Object.values(obj).some(
                (value) =>
                    Array.isArray(value) &&
                    setSearchedTemplates(() =>
                        value?.filter((nestObj) =>
                            Object.values(nestObj).some(
                                (nestValue) =>
                                    typeof nestValue === 'string' &&
                                    nestValue
                                        .toLowerCase()
                                        .includes(searchText?.toLowerCase())
                            )
                        )
                    )
            )
        );
    }, [searchText]);

    // console.log(searchedTemplates, "res");

    const handleScroll = () => {
        const element = document.getElementById(selectedTag);

        if (element) {
            // 👇 Will scroll smoothly to the top of the next section
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="w-[100%]">
            <h1 className="text-center mt-10 text-[48px] max-w-[767px] mx-auto">
                {/* Pick the Plan that Supports your Content Writing Goals.{' '} */}
                <FormattedMessage
                    id="pickup-plan"
                    defaultMessage={'ki eikhane?'}
                />
            </h1>
            <div className="my-10 relative w-[90%] md:w-[398px]  h-[44px] mx-auto rounded-[23px]">
                <InputGroup
                    className="w-full outline-none focus:border-none py-3 px-5 rounded-[23px]"
                    placeholder="Search"
                    type="text"
                    label={undefined}
                    register={undefined}
                    name={undefined}
                    readonly={undefined}
                    value={undefined}
                    error={undefined}
                    icon={undefined}
                    disabled={undefined}
                    id={undefined}
                    horizontal={undefined}
                    validate={undefined}
                    isMask={undefined}
                    msgTooltip={undefined}
                    description={undefined}
                    hasicon={undefined}
                    onChange={(e) => setSearchText(e.target.value)}
                    merged={undefined}
                    options={undefined}
                    onFocus={undefined}
                />
                <Icon
                    icon="ep:search"
                    className=" absolute left-[88%] md:left-[90%] top-[34%] "
                    width={'20px'}
                    rotate={undefined}
                    hFlip={undefined}
                    vFlip={undefined}
                />
            </div>

            <div
                id="All"
                className=" overflow-auto flex flex-wrap  items-center w-[90%] md:w-[80%] mx-auto my-16 "
            >
                <div
                    onClick={() => {
                        setSearchText('');
                        setSelectedTag('All');
                        handleScroll();
                    }}
                    className=" cursor-pointer m-2 flex w-[68px] h-[42px] rounded-[4px] bg-[#14A800] items-center  px-[10px]"
                >
                    <Icon
                        icon="fluent-mdl2:view-all"
                        className=" "
                        width={'22px'}
                        color="white"
                        rotate={undefined}
                        hFlip={undefined}
                        vFlip={undefined}
                    />
                    <p className="text-[16px] font-semibold text-white ml-[10px]">
                        All
                    </p>
                </div>

                <div
                    onClick={() => {
                        setSearchText('Popular');
                    }}
                    className=" cursor-pointer m-2 flex bg-gradient-to-r from-[#FF6849] to-[#FF9400] rounded-[4px]  items-center h-[42px]   p-[10px]"
                >
                    <Icon
                        icon="mdi:flame"
                        className=" "
                        width={'22px'}
                        color="white"
                        rotate={undefined}
                        hFlip={undefined}
                        vFlip={undefined}
                    />
                    <p className="text-[16px] font-semibold text-white ml-[10px]">
                        Popular
                    </p>
                </div>

                <div
                    onClick={() => {
                        setSearchText('Favorite');
                    }}
                    className=" cursor-pointer m-2 flex bg-[white] border border-[.5px] border-[grey]  rounded-[4px]  items-center h-[42px]   p-[10px]"
                >
                    <Icon
                        icon="game-icons:self-love"
                        className=" "
                        width={'22px'}
                        color="grey"
                        rotate={undefined}
                        hFlip={undefined}
                        vFlip={undefined}
                    />
                    <p className="text-[16px] font-semibold text-[grey] ml-[10px]">
                        Favorite
                    </p>
                </div>

                <div
                    onClick={() => {
                        setSelectedTag(() => 'Ads');

                        handleScroll();
                    }}
                    className="cursor-pointer m-2 flex bg-[white] border border-[.5px] border-[grey]  rounded-[4px]  items-center h-[42px]  p-[10px]"
                >
                    <Icon
                        icon="ri:facebook-fill"
                        className=" "
                        width={'22px'}
                        color="grey"
                        rotate={undefined}
                        hFlip={undefined}
                        vFlip={undefined}
                    />
                    <p className="text-[16px] font-semibold text-[grey] ml-[10px]">
                        Ads
                    </p>
                </div>

                <div
                    onClick={() => {
                        setSelectedTag(() => 'Blog');
                        handleScroll();
                    }}
                    className="cursor-pointer m-2 flex bg-[white] border border-[.5px] border-[grey]  rounded-[4px]  items-center h-[42px]   p-[10px]"
                >
                    <Icon
                        icon="bxl:blogger"
                        className=" "
                        width={'22px'}
                        color="grey"
                        rotate={undefined}
                        hFlip={undefined}
                        vFlip={undefined}
                    />
                    <p className="text-[16px] font-semibold text-[grey] ml-[10px]">
                        Blog
                    </p>
                </div>

                <div
                    onClick={() => {
                        setSelectedTag(() => 'Ecommerce');
                        handleScroll();
                    }}
                    className="cursor-pointer m-2 flex bg-[white] border border-[.5px] border-[grey]  rounded-[4px]  items-center h-[42px]   p-[10px]"
                >
                    <Icon
                        icon="ic:baseline-shopify"
                        className=" "
                        width={'22px'}
                        color="grey"
                        rotate={undefined}
                        hFlip={undefined}
                        vFlip={undefined}
                    />
                    <p className="text-[16px] font-semibold text-[grey] ml-[10px]">
                        Ecommerce
                    </p>
                </div>

                <div
                    onClick={() => {
                        setSelectedTag(() => 'Email');
                        handleScroll();
                    }}
                    className="cursor-pointer m-2 flex bg-[white] border border-[.5px] border-[grey]  rounded-[4px]  items-center h-[42px]   p-[10px]"
                >
                    <Icon
                        icon="mdi:email"
                        className=" "
                        width={'22px'}
                        color="grey"
                        rotate={undefined}
                        hFlip={undefined}
                        vFlip={undefined}
                    />
                    <p className="text-[16px] font-semibold text-[grey] ml-[10px]">
                        Email
                    </p>
                </div>

                <div
                    onClick={() => {
                        setSelectedTag('Marketing');
                        handleScroll();
                    }}
                    className="cursor-pointer m-2 flex bg-[white] border border-[.5px] border-[grey]  rounded-[4px]  items-center h-[42px]   p-[10px]"
                >
                    <Icon
                        icon="nimbus:marketing"
                        className=" "
                        width={'22px'}
                        color="grey"
                        rotate={undefined}
                        hFlip={undefined}
                        vFlip={undefined}
                    />
                    <p className="text-[16px] font-semibold text-[grey] ml-[10px]">
                        Marketing
                    </p>
                </div>

                <div
                    onClick={() => {
                        setSelectedTag('Social');
                        handleScroll();
                    }}
                    className="cursor-pointer m-2 flex bg-[white] border border-[.5px] border-[grey]  rounded-[4px]  items-center h-[42px]   p-[10px]"
                >
                    <Icon
                        icon="mdi:like"
                        className=" "
                        width={'22px'}
                        color="grey"
                        rotate={undefined}
                        hFlip={undefined}
                        vFlip={undefined}
                    />
                    <p className="text-[16px] font-semibold text-[grey] ml-[10px]">
                        Social
                    </p>
                </div>
            </div>

            <div className=" w-[90%] mx-auto">
                {templates?.map((item) => (
                    <div key={item?.id}>
                        {searchText ||
                        selectedTag == 'Popular' ||
                        selectedTag == 'Favorite' ? (
                            ''
                        ) : (
                            <p
                                id={item?.category}
                                className="mb-4 mt-8 ml-5 font-semibold text-lg"
                            >
                                {item?.category}
                            </p>
                        )}
                        <div>
                            <div className="flex flex-wrap  items-center">
                                {searchText
                                    ? searchedTemplates?.map((template) => (
                                          <Card
                                              key={template?.id}
                                              className=" w-[300px] m-3 h-[222px] rounded-[12px] bg-white shadow-lg"
                                          >
                                              {' '}
                                              <Link href={template?.url}>
                                                  <div
                                                      title={
                                                          template?.description
                                                              ?.length > 100
                                                              ? template?.description
                                                              : ''
                                                      }
                                                  >
                                                      <div className="flex justify-between">
                                                          <div
                                                              className={`w-[60px]  h-[60px] rounded-[18px] flex justify-center items-center mb-[10px] ${
                                                                  template?.color ==
                                                                  'red'
                                                                      ? 'bg-[red]'
                                                                      : `bg-[${template?.color}]`
                                                              }`}
                                                          >
                                                              <Icon
                                                                  color="white"
                                                                  width={'25px'}
                                                                  // height={'25px'}
                                                                  icon={
                                                                      template?.icon
                                                                  }
                                                              />
                                                          </div>

                                                          <div className="flex  space-x-[20px]">
                                                              <p className="text-[#14A800] text-sm font-semibold">
                                                                  {
                                                                      template?.tag
                                                                  }
                                                              </p>
                                                              <div className="bg-gradient-to-r from-[#FF6849] to-[#FF9400] rounded-[4px] h-[26px] w-[52px] flex justify-center items-center">
                                                                  <Icon
                                                                      color="white"
                                                                      width={
                                                                          '11.08px'
                                                                      }
                                                                      height={
                                                                          '10.5px'
                                                                      }
                                                                      icon="solar:crown-bold"
                                                                  />
                                                                  <p className="text-[white] text-[13px] ml-[2px] font-semibold">
                                                                      PRO
                                                                  </p>
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <div>
                                                          <h3 className="my-[2px] text-[24px]">
                                                              {template?.title}
                                                          </h3>
                                                          {template?.description
                                                              ?.length > 100 ? (
                                                              <p>
                                                                  {template?.description?.slice(
                                                                      0,
                                                                      100
                                                                  )}
                                                              </p>
                                                          ) : (
                                                              <p>
                                                                  {
                                                                      template?.description
                                                                  }
                                                              </p>
                                                          )}

                                                          <div className=" flex justify-between mt-[2px]">
                                                              <div></div>
                                                              <Icon
                                                                  color="#14A800"
                                                                  width={'20px'}
                                                                  height={
                                                                      '20px'
                                                                  }
                                                                  icon={
                                                                      template?.tagIcon
                                                                  }
                                                              />
                                                          </div>
                                                      </div>
                                                  </div>
                                              </Link>
                                          </Card>
                                      ))
                                    : item?.templates?.map((template) => (
                                          <Card
                                              key={template?.id}
                                              className=" w-[300px] m-3 h-[222px] rounded-[12px] bg-white shadow-lg"
                                          >
                                              <Link href={template?.url}>
                                                  <div
                                                      title={
                                                          template?.description
                                                              ?.length > 100
                                                              ? template?.description
                                                              : ''
                                                      }
                                                  >
                                                      <div className="flex justify-between">
                                                          <div
                                                              className={`w-[60px]  h-[60px] rounded-[18px] flex justify-center items-center mb-[10px] ${
                                                                  template?.color ==
                                                                  'red'
                                                                      ? 'bg-[red]'
                                                                      : `bg-[${template?.color}]`
                                                              }`}
                                                          >
                                                              <Icon
                                                                  color="white"
                                                                  width={'25px'}
                                                                  // height={'25px'}
                                                                  icon={
                                                                      template?.icon
                                                                  }
                                                              />
                                                          </div>

                                                          <div className="flex  space-x-[20px]">
                                                              <p className="text-[#14A800] text-sm font-semibold">
                                                                  {
                                                                      template?.tag
                                                                  }
                                                              </p>
                                                              <div className="bg-gradient-to-r from-[#FF6849] to-[#FF9400] rounded-[4px] h-[26px] w-[52px] flex justify-center items-center">
                                                                  <Icon
                                                                      color="white"
                                                                      width={
                                                                          '11.08px'
                                                                      }
                                                                      height={
                                                                          '10.5px'
                                                                      }
                                                                      icon="solar:crown-bold"
                                                                  />
                                                                  <p className="text-[white] text-[13px] ml-[2px] font-semibold">
                                                                      PRO
                                                                  </p>
                                                              </div>
                                                          </div>
                                                      </div>
                                                      <div>
                                                          <h3 className="my-[2px] text-[24px]">
                                                              {template?.title}
                                                          </h3>
                                                          {template?.description
                                                              ?.length > 100 ? (
                                                              <p>
                                                                  {template?.description?.slice(
                                                                      0,
                                                                      100
                                                                  )}
                                                              </p>
                                                          ) : (
                                                              <p>
                                                                  {
                                                                      template?.description
                                                                  }
                                                              </p>
                                                          )}

                                                          <div className=" flex justify-between mt-[2px]">
                                                              <div></div>
                                                              <Icon
                                                                  color="#14A800"
                                                                  width={'20px'}
                                                                  height={
                                                                      '20px'
                                                                  }
                                                                  icon={
                                                                      template?.tagIcon
                                                                  }
                                                              />
                                                          </div>
                                                      </div>
                                                  </div>
                                              </Link>
                                          </Card>
                                      ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PrebuidTemplatesPage;
