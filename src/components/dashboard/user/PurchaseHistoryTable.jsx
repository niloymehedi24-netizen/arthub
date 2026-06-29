"use client";

import Link from "next/link";
import { Table, Chip, Button } from "@heroui/react";

export default function PurchaseHistoryTable({ purchases }) {
  return (
    <Table variant="secondary">
      <Table.ScrollContainer>
        <Table.Content aria-label="Purchase History">
          <Table.Header>
            <Table.Column isRowHeader>ARTWORK</Table.Column>

            <Table.Column>ARTIST</Table.Column>

            <Table.Column>PRICE</Table.Column>

            <Table.Column>PURCHASE DATE</Table.Column>

            <Table.Column>STATUS</Table.Column>

            <Table.Column>ACTION</Table.Column>
          </Table.Header>

          <Table.Body
            items={purchases}
            renderEmptyState={() => (
              <div className="py-10 text-center text-default-500">
                No purchases found.
              </div>
            )}
          >
            {(purchase) => (
              <Table.Row id={purchase._id}>
                <Table.Cell className="font-semibold">
                  {purchase.artworkTitle}
                </Table.Cell>

                <Table.Cell>{purchase.artistName}</Table.Cell>

                <Table.Cell>${purchase.price.toLocaleString()}</Table.Cell>

                <Table.Cell>
                  {new Date(purchase.purchasedAt).toLocaleDateString()}
                </Table.Cell>

                <Table.Cell>
                  <Chip color="success" variant="flat">
                    Purchased
                  </Chip>
                </Table.Cell>

                <Table.Cell>
                  <Button
                    as={Link}
                    href={`/browse-artworks/${purchase.artworkId}`}
                    size="sm"
                    color="secondary"
                    variant="flat"
                  >
                    View
                  </Button>
                </Table.Cell>
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
}
