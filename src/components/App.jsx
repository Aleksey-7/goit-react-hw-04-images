import { useState, useEffect } from 'react';
import { Layout } from './App.styled';
import Searchbar from './Searchbar/Searchbar';
import fetchAPI from './servicesApi/images-api';
import Modal from './Modal/Modal';
import Loader from './Loader/Loader';
import ImageGallery from './ImageGallery/ImageGallery';
import Button from './Button/Button';
import Error from './Error/Error';

export default function App() {
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [images, setImages] = useState(null);
  const [imagesOnPage, setImagesOnPage] = useState(0);
  const [totalImages, setTotalImages] = useState(0);
  const [currentImageUrl, setCurrentImageUrl] = useState(null);
  const [currentImageTag, setCurrentImageTag] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');

  useEffect(() => {
    if (!query) {
      return;
    }

    setIsLoading(true);

    fetchAPI(query, page)
      .then(({ hits, totalHits }) => {
        const array = hits.map(hit => ({
          id: hit.id,
          tag: hit.tags,
          smallImage: hit.webformatURL,
          largeImage: hit.largeImageURL,
        }));

        setTotalImages(totalHits);

        if (!totalHits) {
          alert(`Sorry, but there is no any data for ${query}`);
          return;
        }

        if (totalHits !== 0 && page === 1) {
          setImages(array);
          setImagesOnPage(array.length);
        } else {
          setImages(prevState => [...prevState, ...array]);
          setImagesOnPage(prevState => prevState + array.length);
        }
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      })
      .finally(() => setIsLoading(false));
  }, [query, page]);

  const getResult = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  const onLoadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const onToggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  const onOpenModal = evt => {
    const currentImageUrl = evt.target.dataset.large;
    const currentImageTag = evt.target.alt;

    if (evt.target.nodeName === 'IMG') {
      return (
        setShowModal(!showModal),
        setCurrentImageUrl(currentImageUrl),
        setCurrentImageTag(currentImageTag)
      );
    }
  };

  return (
    <Layout>
      <Searchbar onSubmit={getResult} />

      {isLoading && <Loader />}

      {images && <ImageGallery images={images} openModal={onOpenModal} />}

      {imagesOnPage >= 12 && imagesOnPage < totalImages && (
        <Button onLoadMore={onLoadMore} />
      )}

      {showModal && (
        <Modal
          onClose={onToggleModal}
          currentImageUrl={currentImageUrl}
          currentImageTag={currentImageTag}
        />
      )}
      {status === 'rejected' && <Error error={error} />}
    </Layout>
  );
}
