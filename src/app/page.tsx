'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Product } from '@/types/product';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    axios.get('https://fakestoreapi.com/products')
      .then(response => setProducts(response.data))
      .catch(error => console.error('Erro ao buscar produtos:', error));
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Loja Fake</h1>
      <div className="flex justify-center mb-6">
        <Link href={'/product/new'}>
          <Button variant={'destructive'}>Venda seu produto aqui!</Button>
        </Link>
      </div>
      <h2 className="text-xl font-semibold mb-4 text-center">Produtos</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          <Card key={product.id}>
            <CardHeader>
              <CardTitle className="text-lg truncate">{product.title}</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-2">
              <img src={product.image} alt={product.title} className="w-full h-40 object-contain" />
              <p className="text-lg font-semibold">R$ {product.price}</p>
              <Link href={`/product/${product.id}`}>
                <Button variant="outline">Ver detalhes</Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
