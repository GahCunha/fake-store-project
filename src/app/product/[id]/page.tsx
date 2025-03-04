'use client';
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import Link from "next/link";

export default function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);

    useEffect(() => {
        if (!id) return;

        axios.get(`https://fakestoreapi.com/products/${id}`)
            .then(response => setProduct(response.data))
            .catch(error => console.error('Erro ao buscar produto:', error));
    }, [id]);

    if (!product) {
        return <div className="text-center p-4">Carregando...</div>;
    }

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <Card>
                <CardHeader>
                    <CardTitle>{product.title}</CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                    <img src={product.image} alt={product.title} className="w-full h-64 object-contain" />
                    <p className="text-lg font-semibold">R$ {product.price}</p>
                    <p className="text-gray-600">{product.description}</p>
                    <Button asChild variant="outline"><Link  href="/">Voltar</Link></Button>
                </CardContent>
            </Card>
        </div>
    );
}
