import type { NextPage } from "next";
import { loginState } from "../state";
import { useRecoilState } from "recoil";
import { Menu, Transition } from "@headlessui/react";
import { useRouter } from "next/router";
import { IconLogout, IconChevronDown } from "@tabler/icons-react";
import axios from "axios";
import { Fragment } from "react";
import ThemeToggle from "./ThemeToggle";

const Topbar: NextPage = () => {
	const [login, setLogin] = useRecoilState(loginState);
	const router = useRouter();

	async function logout() {
		await axios.post("/api/auth/logout");
		setLogin({
			userId: 1,
			username: '',
			displayname: '',
			canMakeWorkspace: false,
			thumbnail: '',
			workspaces: [],
			isOwner: false
		});
		router.push('/login');
	}

	return (
		<header className="sticky top-0 z-50 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-700/50 shadow-[0_1px_10px_-4px_rgba(0,0,0,0.15)]">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
				<div className="flex justify-between items-center h-16">
					<div className="flex items-center gap-4">
						<img
							src="/planetary.svg"
							className="h-7 w-auto select-none opacity-90 hover:opacity-100 transition-opacity"
							alt="Planetary logo"
						/>
						<ThemeToggle />
					</div>

					<Menu as="div" className="relative">
						<Menu.Button className="flex items-center gap-2 px-3 py-2 rounded-xl bg-transparent hover:bg-zinc-100/70 dark:hover:bg-zinc-700/60 transition-all duration-150 active:scale-[0.97]">
							<img
								src={login?.thumbnail}
								className="h-8 w-8 rounded-full ring-1 ring-zinc-200 dark:ring-zinc-700 object-cover bg-zinc-200 dark:bg-zinc-600"
								alt={`${login?.displayname}'s avatar`}
							/>
							<span className="text-sm font-medium text-zinc-800 dark:text-zinc-100">
								{login?.displayname}
							</span>
							<IconChevronDown className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
						</Menu.Button>

						<Transition
							as={Fragment}
							enter="transition ease-out duration-100"
							enterFrom="transform opacity-0 scale-95"
							enterTo="transform opacity-100 scale-100"
							leave="transition ease-in duration-75"
							leaveFrom="transform opacity-100 scale-100"
							leaveTo="transform opacity-0 scale-95"
						>
							<Menu.Items className="absolute right-0 mt-2 w-60 origin-top-right rounded-xl bg-white/90 dark:bg-zinc-900/90 backdrop-blur-xl shadow-xl ring-1 ring-black/10 focus:outline-none">
								<div className="p-3">
									<div className="flex items-center gap-3 px-2 py-1.5">
										<img
											src={login?.thumbnail}
											className="h-10 w-10 rounded-full ring-1 ring-zinc-200 dark:ring-zinc-700 object-cover bg-zinc-200 dark:bg-zinc-600"
											alt={`${login?.displayname}'s avatar`}
										/>
										<div>
											<div className="text-sm font-semibold text-zinc-900 dark:text-white">
												{login?.displayname}
											</div>
											<div className="text-xs text-zinc-500 dark:text-zinc-400">
												@{login?.username}
											</div>
										</div>
									</div>

									<div className="h-px bg-gradient-to-r from-transparent via-zinc-300/60 dark:via-zinc-700/60 to-transparent my-3" />

									<Menu.Item>
										{({ active }) => (
											<button
												onClick={logout}
												className={`${
													active ? 'bg-zinc-100/70 dark:bg-zinc-800/60' : ''
												} group flex w-full items-center rounded-lg px-3 py-2 text-sm font-medium transition-colors`}
											>
												<IconLogout className="mr-2 h-5 w-5 text-zinc-500 dark:text-zinc-400" />
												<span className="text-zinc-700 dark:text-zinc-200">Sign out</span>
											</button>
										)}
									</Menu.Item>
								</div>
							</Menu.Items>
						</Transition>
					</Menu>
				</div>
			</div>
		</header>
	);
};

export default Topbar;