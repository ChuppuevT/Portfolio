import React from 'react';
import Card from 'react-bootstrap/Card';

const PhotoContent = () => {
    return (
        <div>
            <Card className="bg-dark text-white">
                <Card.Img src="https://www.topwebviet.com/images/website/1/files/internet.jpg" alt="Card image"  />
                <Card.ImgOverlay>
                    <Card.Title>Сглаживание 2.0 - бесплатный веб-сервис для анализа временных рядов</Card.Title>
                    <Card.Text>
                        Он прост и интуитивно понятен каждому! Все, что вам нужно сделать - загрузить файл и следовать инструкциям.
                    </Card.Text>
                    <Card.Text>Для авторизованных пользователей доступно публичное сохранение данных!</Card.Text>
                </Card.ImgOverlay>
            </Card>
        </div>

    )
}
export default PhotoContent;