import {
    Avatar,
    Box,
    BoxProps,
    Center,
    CloseButton,
    Divider,
    Drawer,
    DrawerContent,
    Flex,
    FlexProps,
    HStack,
    Heading,
    Icon,
    IconButton,
    Image,
    Link,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItem,
    MenuList,
    Spacer,
    StackDivider,
    Text,
    VStack,
    Wrap,
    useColorModeValue,
    useDisclosure,
} from '@chakra-ui/react';
import {
    FiActivity,
    FiBell,
    FiBookOpen,
    FiCheck,
    FiChevronDown,
    FiCode,
    FiCompass,
    FiHome,
    FiMenu,
    FiSettings,
    FiStar,
    FiTrendingUp,
    FiUser,
} from 'react-icons/fi';
import { Flavor, Flavors, Language, Languages, LinkItemProps } from './types';
import React, {
    Dispatch,
    ReactElement,
    ReactNode,
    SetStateAction,
    useState,
} from 'react';

import { IconType } from 'react-icons';
import { LanguageContext } from './contexts';
import { ReactText } from 'react';
import { Link as RouterLink } from 'react-router-dom';

export const LinkItems: Array<LinkItemProps> = [
    { name: 'Home', icon: <FiHome />, route: '/home' },
    { name: 'Transformer', icon: <FiActivity />, route: '/transformer' },
    { name: 'Lambda', icon: <FiCode />, route: '/lambda' },
    { name: 'Account', icon: <FiUser />, route: 'account' },
    { name: 'Settings', icon: <FiSettings />, route: 'settings' },
    { name: 'Docs', icon: <FiBookOpen />, route: 'docs' },
];

export default function SidebarWithHeader({
    children,
}: {
    children: ReactNode;
}) {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const defaultFlavor: Flavor = { name: 'JSTL' };
    const [flavor, setFlavor] = useState(defaultFlavor);
    const defaultLanguage: Language = { name: 'HTML' };
    const [language, setLanguage] = useState(defaultLanguage);
    return (
        <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
            <SidebarContent
                onClose={() => onClose}
                flavor={flavor}
                setFlavor={(flavor: Flavor) => setFlavor(flavor)}
                language={language}
                setLanguage={(language: Language) => setLanguage(language)}
                display={{ base: 'none', md: 'block' }}
            />
            <Drawer
                autoFocus={false}
                isOpen={isOpen}
                placement="left"
                onClose={onClose}
                returnFocusOnClose={false}
                onOverlayClick={onClose}
                size="full"
            >
                <DrawerContent>
                    <SidebarContent
                        onClose={() => onClose}
                        flavor={flavor}
                        setFlavor={(flavor: Flavor) => setFlavor(flavor)}
                        language={language}
                        setLanguage={(language: Language) =>
                            setLanguage(language)
                        }
                        display={{ base: 'none', md: 'block' }}
                    />
                </DrawerContent>
            </Drawer>
            {/* mobilenav */}
            <MobileNav onOpen={onOpen} />
            <Box ml={{ base: 0, md: 60 }} p="4">
                <LanguageContext.Provider value={language}>
                    {children}
                </LanguageContext.Provider>
            </Box>
        </Box>
    );
}

interface SidebarProps extends BoxProps {
    onClose: () => void;
    flavor: Flavor;
    language: Language;
    setFlavor: (flavor: Flavor) => void;
    setLanguage: (language: Language) => void;
}

const SidebarContent = ({
    onClose,
    flavor,
    setFlavor,
    language,
    setLanguage,
    ...rest
}: SidebarProps) => {
    console.log({ flavor, setFlavor });
    console.log('test', setFlavor(Flavors[0]));
    return (
        <Box
            transition="3s ease"
            bg={useColorModeValue('white', 'gray.900')}
            borderRight="1px"
            borderRightColor={useColorModeValue('gray.200', 'gray.700')}
            w={{ base: 'full', md: 60 }}
            pos="fixed"
            h="full"
            {...rest}
        >
            <Flex
                h="12"
                alignItems="center"
                mx="8"
                justifyContent="space-between"
            >
                <HStack>
                    <Box boxSize="m">
                        <Image m="1" src="./logo.png" />
                    </Box>
                    <Spacer />
                    <Text
                        fontSize="2xl"
                        fontFamily="monospace"
                        fontWeight="bold"
                    >
                        Templater
                    </Text>
                    <CloseButton
                        display={{ base: 'flex', md: 'none' }}
                        onClick={onClose}
                    />
                </HStack>
            </Flex>
            <HStack h="full" w="full" bg="green.100">
                <VStack w="5vh" h="full" bg="tomato" spacing={2}>
                    {LinkItems.map((link) => (
                        <Link
                            as={RouterLink}
                            to={link.route}
                            style={{ textDecoration: 'none' }}
                            _focus={{ boxShadow: 'none' }}
                        >
                            <IconButton
                                isRound={true}
                                size="sm"
                                aria-label={`${link.name}`}
                                _groupHover={{
                                    color: 'white',
                                }}
                                icon={link.icon}
                            />
                        </Link>
                    ))}
                </VStack>
                <VStack w="full" h="full" bg="red.100" spacing={4}>
                    <Box w="full" textAlign={['left']}>
                        <Box p="3">
                            <Heading as="h6" size="xs" isTruncated>
                                ENGINE
                            </Heading>
                            <Divider />
                            {Flavors.map((fl) => (
                                <HStack onClick={() => setFlavor(fl)}>
                                    <Text fontSize="sm">{fl.name}</Text>
                                    <Spacer />
                                    {flavor.name === fl.name && (
                                        <Icon as={FiCheck} color="green.600" />
                                    )}
                                </HStack>
                            ))}
                        </Box>
                        <Box p="3">
                            <Heading as="h6" size="xs" isTruncated>
                                LANGUAGE
                            </Heading>
                            <Divider />
                            {Languages.map((lang) => (
                                <HStack onClick={() => setLanguage(lang)}>
                                    <Text fontSize="sm">{lang.name}</Text>
                                    <Spacer />
                                    {language.name === lang.name && (
                                        <Icon as={FiCheck} color="green.600" />
                                    )}
                                </HStack>
                            ))}
                        </Box>
                    </Box>
                </VStack>
            </HStack>
        </Box>
    );
};

interface NavItemProps extends FlexProps {
    icon: IconType;
    children: ReactText;
}
const NavItem = ({ icon, children, ...rest }: NavItemProps) => {
    return (
        <Link
            href="#"
            style={{ textDecoration: 'none' }}
            _focus={{ boxShadow: 'none' }}
        >
            <Flex
                align="center"
                p="4"
                mx="4"
                borderRadius="lg"
                role="group"
                cursor="pointer"
                _hover={{
                    bg: 'cyan.400',
                    color: 'white',
                }}
                {...rest}
            >
                {icon && (
                    <Icon
                        mr="4"
                        fontSize="16"
                        _groupHover={{
                            color: 'white',
                        }}
                        as={icon}
                    />
                )}
                {children}
            </Flex>
        </Link>
    );
};

interface MobileProps extends FlexProps {
    onOpen: () => void;
}
const MobileNav = ({ onOpen, ...rest }: MobileProps) => {
    return (
        <Flex
            ml={{ base: 0, md: 60 }}
            px={{ base: 4, md: 4 }}
            height="12"
            alignItems="center"
            bg={useColorModeValue('white', 'gray.900')}
            borderBottomWidth="1px"
            borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
            justifyContent={{ base: 'space-between', md: 'flex-end' }}
            {...rest}
        >
            <IconButton
                display={{ base: 'flex', md: 'none' }}
                onClick={onOpen}
                variant="outline"
                aria-label="open menu"
                icon={<FiMenu />}
            />

            <Text
                display={{ base: 'flex', md: 'none' }}
                fontSize="2xl"
                fontFamily="monospace"
                fontWeight="bold"
            >
                Logo
            </Text>

            <HStack spacing={{ base: '0', md: '6' }}>
                <IconButton
                    size="lg"
                    variant="ghost"
                    aria-label="open menu"
                    icon={<FiBell />}
                />
                <Flex alignItems={'center'}>
                    <Menu>
                        <MenuButton
                            py={2}
                            transition="all 0.3s"
                            _focus={{ boxShadow: 'none' }}
                        >
                            <HStack>
                                <Avatar
                                    size={'sm'}
                                    src={
                                        'https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9'
                                    }
                                />
                                <VStack
                                    display={{ base: 'none', md: 'flex' }}
                                    alignItems="flex-start"
                                    spacing="1px"
                                    ml="2"
                                >
                                    <Text fontSize="sm">Justina Clark</Text>
                                    <Text fontSize="xs" color="gray.600">
                                        Admin
                                    </Text>
                                </VStack>
                                <Box display={{ base: 'none', md: 'flex' }}>
                                    <FiChevronDown />
                                </Box>
                            </HStack>
                        </MenuButton>
                        <MenuList
                            bg={useColorModeValue('white', 'gray.900')}
                            borderColor={useColorModeValue(
                                'gray.200',
                                'gray.700'
                            )}
                        >
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Billing</MenuItem>
                            <MenuDivider />
                            <MenuItem>Sign out</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </HStack>
        </Flex>
    );
};
