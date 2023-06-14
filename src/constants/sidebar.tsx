export type SideBar = {
    id: number
    name: string
    icon: string
    url: string
}

export const sidebar: SideBar[] = [
    {
        id: 0,
        name: 'Planform Lanch',
        icon: './imgs/icon-board.svg',
        url: '/planform-lanch'
    },
    {
        id: 1,
        name: 'Marketing Plan',
        icon: './imgs/icon-board.svg',
        url: '/marketing-plan'
    },
    {
        id: 2,
        name: 'Roadmap',
        icon: './imgs/icon-board.svg',
        url: '/roadmap'
    }
]