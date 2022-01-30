// react
import React, { useMemo } from "react";
// third-party
import { useIntl } from "react-intl";
// application
import BlockBanners from "~/components/blocks/BlockBanners";
import BlockBrands from "~/components/blocks/BlockBrands";
import BlockFeatures from "~/components/blocks/BlockFeatures";
import BlockFinder from "~/components/blocks/BlockFinder";
import BlockPosts from "~/components/blocks/BlockPosts";
import BlockProductsCarousel from "~/components/blocks/BlockProductsCarousel";
import BlockProductsColumns from "~/components/blocks/BlockProductsColumns";
import BlockSale from "~/components/blocks/BlockSale";
import BlockSpace from "~/components/blocks/BlockSpace";
import BlockZone from "~/components/blocks/BlockZone";
import url from "~/services/url";
import { shopApi, blogApi } from "~/api";
import Slider from "react-slick";
import { useDeferredData, useProductColumns, useProductTabs } from "~/services/hooks";
import BlockSlideshow from "~/components/blocks/BlockSlideshow";

function Page() {
    const intl = useIntl();

    /**
     * Featured products.
     */
    const featuredProducts = useProductTabs(
        useMemo(
            () => [
                { id: 1, name: "All", categorySlug: null },
                { id: 2, name: "Power Tools", categorySlug: "power-tools" },
                { id: 3, name: "Hand Tools", categorySlug: "hand-tools" },
                { id: 4, name: "Plumbing", categorySlug: "plumbing" },
            ],
            []
        ),
        (tab) => shopApi.getFeaturedProducts(tab.categorySlug, 8)
    );

    const blockSale = useDeferredData(() => shopApi.getSpecialOffers(8), []);

    const blockZones = useMemo(
        () => [
            {
                image: "/images/categories/category-overlay-1.jpg",
                mobileImage: "/images/categories/category-overlay-1-mobile.jpg",
                categorySlug: "tires-wheels",
            },
            {
                image: "/images/categories/category-overlay-2.jpg",
                mobileImage: "/images/categories/category-overlay-2-mobile.jpg",
                categorySlug: "interior-parts",
            },
            {
                image: "/images/categories/category-overlay-3.jpg",
                mobileImage: "/images/categories/category-overlay-3-mobile.jpg",
                categorySlug: "engine-drivetrain",
            },
        ],
        []
    );

    const newArrivals = useDeferredData(() => shopApi.getLatestProducts(12), []);
    const newArrivalsLinks = useMemo(
        () => [
            { title: "Wheel Covers", url: url.products() },
            { title: "Timing Belts", url: url.products() },
            { title: "Oil Pans", url: url.products() },
            { title: "Show All", url: url.products() },
        ],
        []
    );

    const latestPosts = useDeferredData(() => blogApi.getLatestPosts(8), []);
    const latestPostsLinks = useMemo(
        () => [
            { title: "Special Offers", url: url.blog() },
            { title: "New Arrivals", url: url.blog() },
            { title: "Reviews", url: url.blog() },
        ],
        []
    );

    const brands = useDeferredData(() => shopApi.getBrands({ limit: 16 }), []);

    /**
     * Product columns.
     */
    const columns = useProductColumns(
        useMemo(
            () => [
                {
                    title: "Top Rated Products",
                    source: () => shopApi.getTopRatedProducts(null, 3),
                },
                {
                    title: "Special Offers",
                    source: () => shopApi.getSpecialOffers(3),
                },
                {
                    title: "Bestsellers",
                    source: () => shopApi.getPopularProducts(null, 3),
                },
            ],
            []
        )
    );

    // const settings = {
    //     dots: true,
    //     infinite: true,
    //     speed: 500,
    //     slidesToShow: 1,
    //     slidesToScroll: 1,
    // };

    const slides = useMemo(
        () => [
            {
                url: "/catalog/products",
                desktopImage: "https://amalsandbox.vtexassets.com/arquivos/ids/155420/Spotlight-image-1.png",
                mobileImage: "/images/slides/slide-3-mobile.jpg",
                offer: "",
                title: "",
                details: "",
                buttonLabel: "",
            },
            {
                url: "/catalog/products",
                desktopImage: "https://amalsandbox.vtexassets.com/arquivos/ids/155420/Spotlight-image-1.png",
                mobileImage: "/images/slides/slide-2-mobile.jpg",
                offer: "",
                title: "",
                details: "",
                buttonLabel: "",
            },
            {
                url: "/catalog/products",
                desktopImage: "https://amalsandbox.vtexassets.com/arquivos/ids/155420/Spotlight-image-1.png",
                mobileImage: "/images/slides/slide-1-mobile.jpg",
                offer: "",
                title: "",
                details: "",
                buttonLabel: "",
            },
        ],
        []
    );

    return (
        <React.Fragment>
            <BlockSlideshow slides={slides} />
            <BlockFeatures layout="top-strip" />
            {/* <Slider {...settings}>
                <div>
                    <h3>1</h3>
                </div>
                <div>
                    <h3>2</h3>
                </div>
                <div>
                    <h3>3</h3>
                </div>
                <div>
                    <h3>4</h3>
                </div>
                <div>
                    <h3>5</h3>
                </div>
                <div>
                    <h3>6</h3>
                </div>
            </Slider> */}
            {/* <BlockFinder />
            <BlockFeatures layout="top-strip" />
            <BlockSpace layout="divider-nl" />
            <BlockProductsCarousel
                blockTitle={intl.formatMessage({ id: 'HEADER_FEATURED_PRODUCTS' })}
                layout="grid-5"
                loading={featuredProducts.isLoading}
                products={featuredProducts.data}
                groups={featuredProducts.tabs}
                currentGroup={featuredProducts.tabs.find((x) => x.current)}
                onChangeGroup={featuredProducts.handleTabChange}
            />
            <BlockSpace layout="divider-nl" />
            <BlockSale
                products={blockSale.data}
                loading={blockSale.isLoading}
            />
            <BlockSpace layout="divider-lg" />

            {blockZones.map((blockZone, blockZoneIdx) => (
                <React.Fragment key={blockZoneIdx}>
                    <BlockZone
                        image={blockZone.image}
                        mobileImage={blockZone.mobileImage}
                        categorySlug={blockZone.categorySlug}
                    />
                    {blockZoneIdx < blockZones.length - 1 && (
                        <BlockSpace layout="divider-sm" />
                    )}
                </React.Fragment>
            ))}

            <BlockSpace layout="divider-nl" />
            <BlockBanners />
            <BlockSpace layout="divider-nl" />
            <BlockProductsCarousel
                blockTitle={intl.formatMessage({ id: 'HEADER_NEW_ARRIVALS' })}
                layout="horizontal"
                rows={2}
                loading={newArrivals.isLoading}
                products={newArrivals.data}
                links={newArrivalsLinks}
            />
            <BlockSpace layout="divider-nl" />
            <BlockPosts
                blockTitle={intl.formatMessage({ id: 'HEADER_LATEST_NEWS' })}
                layout="grid"
                loading={latestPosts.isLoading}
                posts={latestPosts.data}
                links={latestPostsLinks}
            />
            <BlockSpace layout="divider-nl" />
            <BlockBrands
                layout="columns-8-full"
                brands={brands.data}
            />
            <BlockSpace layout="divider-nl" className="d-xl-block d-none" />
            <BlockProductsColumns columns={columns} /> */}
            <BlockSpace layout="before-footer" />
        </React.Fragment>
    );
}

export default Page;
