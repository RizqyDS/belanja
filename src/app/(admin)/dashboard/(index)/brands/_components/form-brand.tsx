"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AlertCircle, ChevronLeft } from "lucide-react";
import Link from "next/link";
import React from "react";
import { useFormState, useFormStatus } from "react-dom";
import { postBrand } from "../lib/actions";
import { ActionResult } from "@/types";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Brand } from "@prisma/client";
import { updateBrand } from "../lib/actions";

const initialState: ActionResult = {
  error: "",
};

interface FormBrandProps {
  type?: "ADD" | "EDIT";
  data?: Brand | null;
}

function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" size="sm" disabled={pending}>
      {pending ? "Loading..." : "Save Brand"}
    </Button>
  );
}

export default function FormBrand({data, type}: FormBrandProps) {

  const updateWithId = (_: unknown, formData: FormData) => updateBrand(_, formData, data?.id ?? 0)

  const [state, formAction] = useFormState(type === "ADD" ? postBrand : updateWithId, initialState)

  return (
    <form action={formAction}>
      <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="h-7 w-7" asChild>
              <Link href="/dashboard/brands">
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Back</span>
              </Link>
            </Button>
            <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
              Brand Controller
            </h1>
            <div className="hidden items-center gap-2 md:ml-auto md:flex">
              <Button variant="outline" size="sm">
                Discard
              </Button>
              <SubmitButton />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
            <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
              <Card x-chunk="dashboard-07-chunk-0" className="w-[500px]">
                <CardHeader>
                  <CardTitle>Brand Details</CardTitle>
                  <CardDescription>
                    Lipsum dolor sit amet, consectetur adipiscing elit
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {state.error !== "" && (
                    <Alert variant="destructive" className="mb-4">
                      <AlertCircle className="h-4 w-4" />
                      <AlertTitle>Error</AlertTitle>
                      <AlertDescription>{state.error}</AlertDescription>
                    </Alert>
                  )}

                  <div className="grid gap-6">
                    <div className="grid gap-3">
                      <Label htmlFor="name">Name</Label>
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        className="w-full"
                        defaultValue={data?.name}
                      />
                    </div>
                    <div className="grid gap-3">
                      <Label htmlFor="logo">Logo</Label>
                      <Input
                        id="logo"
                        type="file"
                        name="image"
                        className="w-full"
                      />
                    </div>
                    {/* <div className="grid gap-3">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam auctor, nisl nec ultricies ultricies, nunc nisl ultricies nunc, nec ultricies nunc nisl nec nunc."
                      className="min-h-32"
                    />
                  </div> */}
                  </div>
                </CardContent>
              </Card>
              {/* <Card x-chunk="dashboard-07-chunk-1">
              <CardHeader>
                <CardTitle>Stock</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">SKU</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead className="w-[100px]">Size</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-semibold">GGPC-001</TableCell>
                      <TableCell>
                        <Label htmlFor="stock-1" className="sr-only">
                          Stock
                        </Label>
                        <Input id="stock-1" type="number" defaultValue="100" />
                      </TableCell>
                      <TableCell>
                        <Label htmlFor="price-1" className="sr-only">
                          Price
                        </Label>
                        <Input
                          id="price-1"
                          type="number"
                          defaultValue="99.99"
                        />
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">GGPC-002</TableCell>
                      <TableCell>
                        <Label htmlFor="stock-2" className="sr-only">
                          Stock
                        </Label>
                        <Input id="stock-2" type="number" defaultValue="143" />
                      </TableCell>
                      <TableCell>
                        <Label htmlFor="price-2" className="sr-only">
                          Price
                        </Label>
                        <Input
                          id="price-2"
                          type="number"
                          defaultValue="99.99"
                        />
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-semibold">GGPC-003</TableCell>
                      <TableCell>
                        <Label htmlFor="stock-3" className="sr-only">
                          Stock
                        </Label>
                        <Input id="stock-3" type="number" defaultValue="32" />
                      </TableCell>
                      <TableCell>
                        <Label htmlFor="price-3" className="sr-only">
                          Stock
                        </Label>
                        <Input
                          id="price-3"
                          type="number"
                          defaultValue="99.99"
                        />
                      </TableCell>
                      <TableCell></TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
              <CardFooter className="justify-center border-t p-4">
                <Button size="sm" variant="ghost" className="gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  Add Variant
                </Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-07-chunk-2">
              <CardHeader>
                <CardTitle>Product Category</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6 sm:grid-cols-3">
                  <div className="grid gap-3">
                    <Label htmlFor="category">Category</Label>
                    <Select>
                      <SelectTrigger id="category" aria-label="Select category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="clothing">Clothing</SelectItem>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="accessories">Accessories</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="subcategory">Subcategory (optional)</Label>
                    <Select>
                      <SelectTrigger
                        id="subcategory"
                        aria-label="Select subcategory"
                      >
                        <SelectValue placeholder="Select subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="t-shirts">T-Shirts</SelectItem>
                        <SelectItem value="hoodies">Hoodies</SelectItem>
                        <SelectItem value="sweatshirts">Sweatshirts</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card> */}
            </div>
            {/* <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
            <Card x-chunk="dashboard-07-chunk-3">
              <CardHeader>
                <CardTitle>Product Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="grid gap-3">
                    <Label htmlFor="status">Status</Label>
                    <Select>
                      <SelectTrigger id="status" aria-label="Select status">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="draft">Draft</SelectItem>
                        <SelectItem value="published">Active</SelectItem>
                        <SelectItem value="archived">Archived</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden" x-chunk="dashboard-07-chunk-4">
              <CardHeader>
                <CardTitle>Product Images</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-2">
                  <Image
                    alt="Product image"
                    className="aspect-square w-full rounded-md object-cover"
                    height="300"
                    src="/placeholder.svg"
                    width="300"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <button>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/placeholder.svg"
                        width="84"
                      />
                    </button>
                    <button>
                      <Image
                        alt="Product image"
                        className="aspect-square w-full rounded-md object-cover"
                        height="84"
                        src="/placeholder.svg"
                        width="84"
                      />
                    </button>
                    <button className="flex aspect-square w-full items-center justify-center rounded-md border border-dashed">
                      <Upload className="h-4 w-4 text-muted-foreground" />
                      <span className="sr-only">Upload</span>
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card x-chunk="dashboard-07-chunk-5">
              <CardHeader>
                <CardTitle>Archive Product</CardTitle>
                <CardDescription>
                  Lipsum dolor sit amet, consectetur adipiscing elit.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div></div>
                <Button size="sm" variant="secondary">
                  Archive Product
                </Button>
              </CardContent>
            </Card>
          </div> */}
          </div>
          <div className="flex items-center justify-center gap-2 md:hidden">
            <Button variant="outline" size="sm">
              Discard
            </Button>
            <Button size="sm">Save Product</Button>
          </div>
        </div>
      </div>
    </form>
  );
}
