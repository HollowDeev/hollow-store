"use client"

import { MenuIcon, ShoppingCartIcon, LogInIcon, PercentIcon, ListOrderedIcon, HomeIcon, LogOutIcon } from "lucide-react"
import { Button } from "./button"
import { Card } from "./card"
import { Sheet, SheetContent, SheetHeader, SheetTrigger } from "./sheet"
import { signIn, useSession, signOut } from "next-auth/react"
import { Avatar, AvatarFallback } from "@radix-ui/react-avatar"
import { AvatarImage } from "./avatar"
import { Separator } from "./separator"

export const Header = () => {

    const {status, data} = useSession()

    const handleLoginClick = async () => {
        await signIn()
    }

     const handleLogoutClick = async () => {
        await signOut()
    }


  return (
    <Card className="flex justify-between p-[1.875rem] items-center">
        <Sheet>
            <SheetTrigger asChild>
                <Button size="icon" variant="outline">
                    <MenuIcon />
                </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <SheetHeader className="text-left text-lg font-semibold">
                    Menu
                </SheetHeader>

                {status === "authenticated" && data?.user && (
                   <div className="fex items-center gap2 mt-2">

                        <div className="flex flex-col">
                            <p> Olá 
                                <span className="font-bold text-primary"> {data.user.name}</span>, tudo bem?
                            </p>
                            <p className="font-bold">Boas compras!</p>
                        </div>

                        <Separator className="mt-2" />
                   </div>
                )}

                <div className="mt-2 flex flex-col gap-2">

                    {
                        status === "unauthenticated" && (
                            <Button onClick={handleLoginClick} className="w-full justify-start gap-2">
                                <LogInIcon size={16} /> 
                                Fazer login
                            </Button>
                        ) 
                    }

                    <Button variant="outline" className="w-full justify-start gap-2">
                        <HomeIcon size={16} /> 
                        Início
                    </Button>

                    <Button variant="outline" className="w-full justify-start gap-2">
                        <PercentIcon size={16} /> 
                        Ofertas
                    </Button>

                    <Button variant="outline" className="w-full justify-start gap-2">
                        <ListOrderedIcon size={16} /> 
                        Catálogo
                    </Button>

                    {
                        status === "authenticated" && (
                            <Button onClick={handleLogoutClick} className="w-full justify-start gap-2">
                                <LogOutIcon size={16} /> 
                                Sair
                            </Button>
                        ) 
                    }


                </div>
            </SheetContent>
        </Sheet>

        <h1 className="font-semibold text-lg">
            <span className="text-primary">HOLLOW </span> Store
        </h1>

        <Button size="icon" variant="outline">
            <ShoppingCartIcon />
        </Button>
    </Card>
  )
}
