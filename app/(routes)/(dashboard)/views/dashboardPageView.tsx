"use client";
import classNames from "classnames";
import styles from "../shared/styles/dashboard.module.scss";
import { Button } from "@/shared/ui/Button";
import { AppRoutes, Plans } from "@/shared/types/enums";
import { useTranslations } from "next-intl";
import ReactECharts from "echarts-for-react";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";
import { Performance, Post } from "../shared/types";
import { useAnalyticsPosts } from "../api/posts/queries";
import { useAnalyticsPerformances } from "../api/performances/queries";
import { useAudienceByAge, useAudienceByGender } from "../api/audience/queries";
import Skeleton from "react-loading-skeleton";

export default function DashboardPageView() {
  const tButtons = useTranslations("buttons");
  const tWidgets = useTranslations("widgets");
  const router = useRouter();
  const { auth, handleUpgradePlan } = useAuth();

  const { data: performances, isLoading: isPerformancesLoading } = useAnalyticsPerformances();
  const { data: audienceByGender, isLoading: isAudienceByGenderLoading } = useAudienceByGender();
  const { data: audienceByAge, isLoading: isAudienceByAgeLoading } = useAudienceByAge();
  const { data: posts, isLoading: isPostsLoading } = useAnalyticsPosts();

  const handleSeeMore = () => {
    if (auth?.user?.subscription?.planId !== Plans.BASIC) {
      router.push(AppRoutes.ANALYTICS);
    } else {
      handleUpgradePlan();
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.widget}>
        <div className={styles.widget__header}>
          <div className={styles.widget__header__content}>
            <span className={styles.widget__header__title}>{tWidgets("pagePerformance.title")}</span>
            <p className={styles.widget__header__desc}>{tWidgets("pagePerformance.description")}</p>
          </div>
          <div className={styles.widget__header__actions}>
            <Button
              designType="text"
              onClick={handleSeeMore}
            >
              {tButtons("seeMore")}
            </Button>
          </div>
        </div>
        <div className={styles.widget__body}>
          {isPerformancesLoading ? (
            <Skeleton height={208} />
          ) : (
            <div className={styles.statsWrapper}>
              {performances?.map((performance: Performance) => (
                <div
                  className={styles.stat}
                  key={performance?.id}
                >
                  <span className={styles.stat__title}>{performance?.name}</span>
                  <span className={styles.stat__value}>
                    {performance?.value}
                    {performance?.difference?.unit}
                  </span>
                  {performance?.difference?.amount !== 0 && (
                    <span className={classNames(styles.stat__label, performance?.difference?.amount > 0 ? styles.success : styles.danger)}>
                      {performance?.difference?.amount}
                      {performance?.difference?.unit}
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className={styles.widget}>
        <div className={styles.widget__body}>
          <div className={styles.widgetsWrapper}>
            <div className={styles.widget}>
              <div className={styles.widget__header}>
                <div className={styles.widget__header__content}>
                  <span className={styles.widget__header__title}>{tWidgets("audienceByGender.title")}</span>
                </div>
                <div className={styles.widget__header__actions}>
                  <Button
                    designType="text"
                    onClick={handleSeeMore}
                  >
                    {tButtons("seeMore")}
                  </Button>
                </div>
              </div>
              <div className={styles.widget__body}>
                {isAudienceByGenderLoading ? (
                  <Skeleton height={452} />
                ) : (
                  <div className={styles.chart}>
                    {audienceByGender?.length > 0 && (
                      <ReactECharts
                        option={audienceByGender[0]}
                        style={{ height: "420px", width: "100%" }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
            <div className={styles.widget}>
              <div className={styles.widget__header}>
                <div className={styles.widget__header__content}>
                  <span className={styles.widget__header__title}>{tWidgets("topCountries.title")}</span>
                </div>
                <div className={styles.widget__header__actions}>
                  <Button
                    designType="text"
                    onClick={handleSeeMore}
                  >
                    {tButtons("seeMore")}
                  </Button>
                </div>
              </div>

              <div className={styles.widget__body}>
                {isAudienceByAgeLoading ? (
                  <Skeleton height={452} />
                ) : (
                  <div className={styles.chart}>
                    {audienceByAge?.length > 0 && (
                      <ReactECharts
                        option={audienceByAge[0]}
                        style={{ height: "420px", width: "100%" }}
                      />
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.widget}>
        <div className={styles.widget__header}>
          <div className={styles.widget__header__content}>
            <span className={styles.widget__header__title}>{tWidgets("posts.title")}</span>
            <p className={styles.widget__header__desc}>{tWidgets("posts.description")}</p>
          </div>
          <div className={styles.widget__header__actions}>
            <Button
              designType="text"
              onClick={handleSeeMore}
            >
              {tButtons("seeMore")}
            </Button>
          </div>
        </div>
        <div className={styles.widget__body}>
          {isPostsLoading ? (
            <Skeleton height={452} />
          ) : (
            <div className={styles.tableContainer}>
              <div className={styles.table}>
                <table>
                  <thead>
                    <tr>
                      <th>№</th>
                      <th>Likes</th>
                      <th>Reach</th>
                      <th>Saved</th>
                      <th>Shares</th>
                      <th>Comments</th>
                      <th>Impressions</th>
                      <th>Video views</th>
                      <th>Engagement rate</th>
                      <th>Total interactions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {posts?.slice(0, 8)?.map((post: Post, index: number) => (
                      <tr key={index}>
                        <td>#{index + 1}</td>
                        <td>{post?.metric?.likes || 0}</td>
                        <td>{post?.metric?.reach || 0}</td>
                        <td>{post?.metric?.saved || 0}</td>
                        <td>{post?.metric?.shares || 0}</td>
                        <td>{post?.metric?.comments || 0}</td>
                        <td>{post?.metric?.impressions || 0}</td>
                        <td>{post?.metric?.video_views || 0}</td>
                        <td>{post?.metric?.engagement_rate || 0}</td>
                        <td>{post?.metric?.total_interactions || 0}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
