'use client';
import axios from "axios";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Product } from "@/types/product";

export default function SellProduct() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState("");
    const [category, setCategory] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [product, setProduct] = useState<Product | null>(null);

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");
        setProduct(null);

        try {
            const response = await axios.post("https://fakestoreapi.com/products", {
                title,
                price: parseFloat(price),
                description,
                image,
                category
            });

            if (response.status === 200 || response.status === 201) {
                setMessage("Produto cadastrado com sucesso!");
                setProduct(response.data);
            }
        } catch (error) {
            setMessage("Erro ao cadastrar produto. Tente novamente.");
            console.error("Erro ao cadastrar produto:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-10">
            <Card>
                <CardHeader>
                    <CardTitle>Vender um Produto</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                        <Label>Nome do Produto</Label>
                        <Input type="text" placeholder="Nome do Produto" value={title} onChange={(e) => setTitle(e.target.value)} required />

                        <Label>Preço</Label>
                        <Input type="number" placeholder="Preço" value={price} onChange={(e) => setPrice(e.target.value)} required />

                        <Label>Descrição</Label>
                        <Textarea placeholder="Descrição" value={description} onChange={(e) => setDescription(e.target.value)} required />

                        <Label>URL da Imagem</Label>
                        <Input type="text" placeholder="URL da Imagem" value={image} onChange={(e) => setImage(e.target.value)} required />

                        <Label>Categoria</Label>
                        <Input type="text" placeholder="Categoria" value={category} onChange={(e) => setCategory(e.target.value)} required />

                        <Button type="submit" disabled={loading} className="mt-4">
                            {loading ? "Cadastrando..." : "Vender Produto"}
                        </Button>
                    </form>
                    {message && <p className="mt-4 text-center text-lg font-semibold">{message}</p>}
                    {product && (
                        <Card className="mt-6">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold">Produto Adicionado</CardTitle>
                            </CardHeader>
                            <CardContent className="flex flex-col items-center gap-4">
                                <img src={product.image} alt={product.title} className="w-40 h-40 object-contain" />
                                <p className="text-lg font-semibold">{product.title}</p>
                                <p className="text-sm text-gray-600">R$ {product.price}</p>
                                <p className="text-sm text-gray-600 text-center">{product.description}</p>
                                <p className="text-sm text-gray-600">Categoria: {product.category}</p>
                            </CardContent>
                        </Card>
                    )}
                </CardContent>
            </Card>
        </div>
    );
}
