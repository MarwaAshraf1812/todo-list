"use client"

import { useQuery, useMutation } from "convex/react"
import { api } from "../../convex/_generated/api"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PlusIcon } from "lucide-react"
import { useState } from "react"

export function CategoryList({ userId }: { userId: string }) {
  const [newCategory, setNewCategory] = useState("")
  const categories = useQuery(api.tasks.getCategories)
  const createCategory = useMutation(api.tasks.createCategory)

  const handleCreateCategory = async () => {
    if (newCategory.trim()) {
      await createCategory({
        name: newCategory,
        userId: userId
      })
      setNewCategory("")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Categories</CardTitle>
        <CardDescription>Organize your tasks by categories.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2 mb-4">
          <Input
            placeholder="New category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <Button size="sm" onClick={handleCreateCategory}>
            <PlusIcon className="h-4 w-4" />
          </Button>
        </div>
        <div className="space-y-2">
          {categories?.map((category) => (
            <div
              key={category._id}
              className="p-2 rounded-lg hover:bg-accent cursor-pointer"
            >
              {category.name}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}