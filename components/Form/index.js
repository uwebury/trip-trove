import { useState, useEffect } from "react";
import mongoose from "mongoose";
import toast from "react-hot-toast";
import {
  toastDuration,
  validateTripDates,
  formatDateForInput,
} from "@/lib/utils";
import { ToastMessage } from "@/components/ToastMessage";
import {
  ButtonContainer,
  StyledTextButton,
} from "@/components/Button/TextButton";
import {
  Label,
  TripForm,
  Input,
  DateContainer,
  PackListContainer,
  PackList,
  InputContainer,
  InputItem,
  InputQuantity,
  StyledMiniButton,
} from "@/components/Form/Form.styled";

export default function Form({ defaultData, isEditMode, onSubmit }) {
  const [formDisabled, setFormDisabled] = useState(false);
  const [handoverData, setHandoverData] = useState(defaultData);
  const [initialPackingList, setInitialPackingList] = useState();
  const [updatedPackingList, setUpdatedPackingList] = useState();
  const [hasChanges, setHasChanges] = useState(false);

  const { ObjectId } = mongoose.Types;

  function generateObjectId() {
    const newObjectId = new ObjectId().toString();
    return newObjectId;
  }

  useEffect(() => {
    if (!defaultData || defaultData?.packingList?.length === 0) {
      setInitialPackingList([
        { _id: generateObjectId(), itemName: "", itemQuantity: null },
      ]);
    } else {
      setInitialPackingList(defaultData?.packingList);
    }
    setUpdatedPackingList(initialPackingList);
  }, [defaultData]);

  useEffect(() => {
    setHandoverData((prev) => ({
      ...prev,
      packingList: initialPackingList,
    }));
  }, [initialPackingList]);

  function handleInput(event) {
    setHandoverData((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
    setHasChanges(true);
  }

  function handleAddItem() {
    const lastItem =
      handoverData.packingList[handoverData.packingList.length - 1];

    if (!lastItem || lastItem.itemName.trim() !== "") {
      setHandoverData((prev) => ({
        ...prev,
        packingList: [
          ...prev.packingList,
          { _id: generateObjectId(), itemName: "", itemQuantity: null },
        ],
      }));
    }
  }

  function handleUpdateItem(itemId, itemName, itemQuantity) {
    setHandoverData((prev) => {
      const updatedPackingList = prev.packingList.map((item) =>
        item._id === itemId ? { ...item, itemName, itemQuantity } : item
      );

      setUpdatedPackingList(updatedPackingList);
      setHasChanges(true);

      return {
        ...prev,
        packingList: updatedPackingList,
      };
    });
  }

  function handleRemoveItem(itemIdToRemove) {
    setHandoverData((prevData) => {
      let updatedPackingList;
      let hasChanges = true;

      if (prevData.packingList.length === 1) {
        updatedPackingList = [
          { _id: generateObjectId(), itemName: "", itemQuantity: null },
        ];
      } else {
        updatedPackingList = prevData.packingList.filter(
          (item) => item._id !== itemIdToRemove
        );
      }

      if (
        JSON.stringify(updatedPackingList) ===
        JSON.stringify(prevData.packingList)
      ) {
        hasChanges = false;
      }

      setUpdatedPackingList(updatedPackingList);
      setHasChanges(hasChanges);

      return {
        ...prevData,
        packingList: updatedPackingList,
      };
    });
  }

  function handleReset() {
    toast.dismiss();
    setFormDisabled(true);
    if (!hasChanges) {
      toast.error("No entries yet, nothing to reset.", {
        duration: toastDuration,
      });
      setFormDisabled(false);
      return;
    }

    const resetPackingList = [
      { _id: generateObjectId(), itemName: "", itemQuantity: null },
    ];

    toast(
      <ToastMessage
        message="Are you sure to reset form?"
        textConfirmButton="Yes, reset please."
        messageAfterConfirm="Ok, form reset."
        textCancelButton="No, don&rsquo;t reset!"
        messageAfterCancel="Ok, no reset."
        onConfirm={() => {
          setInitialPackingList(resetPackingList);
          setUpdatedPackingList(resetPackingList);
          setHandoverData(defaultData);
          setFormDisabled(false);
        }}
        onCancel={() => {
          setFormDisabled(false);
        }}
      />,
      { duration: Infinity }
    );
  }

  function handleDiscard() {
    toast.dismiss();
    setFormDisabled(true);
    if (!hasChanges) {
      toast.error("No changes yet, nothing to discard.", {
        duration: toastDuration,
      });
      setFormDisabled(false);
      return;
    }

    toast(
      <ToastMessage
        message="Are you sure to discard all changes?"
        textConfirmButton="Yes, discard please."
        messageAfterConfirm="Form reset to last saved version."
        textCancelButton="No, don&rsquo;t discard!"
        messageAfterCancel="Nothing changed."
        onConfirm={() => {
          setHandoverData(defaultData);
          setUpdatedPackingList(initialPackingList);
          setFormDisabled(false);
        }}
        onCancel={() => {
          setFormDisabled(false);
        }}
      />,
      { duration: Infinity }
    );
  }

  function handleSubmit(event) {
    event.preventDefault();
    toast.dismiss();
    setFormDisabled(true);

    if (!hasChanges) {
      toast.error("No changes yet, nothing to save.", {
        duration: toastDuration,
      });
      setFormDisabled(false);
      return;
    }

    if (!validateTripDates(handoverData)) {
      toast.error("End date earlier than start date.", {
        duration: toastDuration,
      });
      setFormDisabled(false);
      return;
    }

    const hasEmptyItems = handoverData.packingList.some(
      (item) => item.itemName.trim() === "" && item.itemQuantity === null
    );

    const modifiedHandoverData =
      handoverData?.packingList.length === 1 && hasEmptyItems
        ? {
            ...handoverData,
            packingList: [],
          }
        : handoverData?.packingList.length > 1 && hasEmptyItems
        ? {
            ...handoverData,
            packingList: handoverData.packingList.filter(
              (item) =>
                item.itemName.trim() !== "" || item.itemQuantity !== null
            ),
          }
        : handoverData;

    toast(
      <ToastMessage
        message="Are you sure to save all changes?"
        textConfirmButton="Yes, save please."
        messageAfterConfirm="Data successfully saved."
        textCancelButton="No, don&rsquo;t save."
        messageAfterCancel="Data not saved."
        onConfirm={() => {
          onSubmit(modifiedHandoverData);
          setFormDisabled(false);
        }}
        onCancel={() => {
          setFormDisabled(false);
        }}
      />,
      { duration: Infinity }
    );
  }

  return (
    <TripForm
      aria-label="trip form"
      onSubmit={handleSubmit}
      formDisabled={formDisabled}
    >
      <Label htmlFor="destination">Destination</Label>
      <Input
        id="destination"
        name="destination"
        type="text"
        value={handoverData?.destination || ""}
        onInput={handleInput}
        required
        disabled={formDisabled}
        autoFocus
      />
      <DateContainer>
        <Label htmlFor="start">Start</Label>
        <Input
          id="start"
          name="start"
          type="date"
          value={formatDateForInput(handoverData?.start || "")}
          onInput={handleInput}
          required
          disabled={formDisabled}
        />
        <Label htmlFor="end">End</Label>
        <Input
          id="end"
          name="end"
          type="date"
          value={formatDateForInput(handoverData?.end || "")}
          onInput={handleInput}
          required
          disabled={formDisabled}
        />
      </DateContainer>
      <Label htmlFor="imageURL">Image URL</Label>
      <Input
        id="imageURL"
        name="imageURL"
        type="text"
        value={handoverData?.imageURL || ""}
        onInput={handleInput}
        disabled={formDisabled}
      />
      <PackListContainer>
        <Label htmlFor="packingList">Packing List</Label>
        <PackList>
          {handoverData?.packingList?.map((item, index) => (
            <InputContainer key={item._id}>
              <InputItem
                id={`packingList_${item._id}`}
                name={`packingList_${item._id}`}
                type="text"
                value={item.itemName}
                onChange={(event) =>
                  handleUpdateItem(
                    item._id,
                    event.target.value,
                    item.itemQuantity
                  )
                }
                disabled={formDisabled}
              />
              <InputQuantity
                id={`packingList_quantity_${item._id}`}
                name={`packingList_quantity_${item._id}`}
                type="number"
                value={item.itemQuantity}
                onChange={(event) =>
                  handleUpdateItem(item._id, item.itemName, event.target.value)
                }
                disabled={formDisabled}
                min="0"
                max="999"
              />
              <StyledMiniButton
                type="button"
                id="delete"
                action="delete"
                onClick={() => handleRemoveItem(item._id)}
                disabled={formDisabled}
              >
                X
              </StyledMiniButton>
              {(index === handoverData.packingList.length - 1 ||
                handoverData.packingList.length === 1) && (
                <StyledMiniButton
                  type="button"
                  id="add"
                  action="add"
                  fontSize={"1.4rem"}
                  onClick={handleAddItem}
                  disabled={formDisabled}
                >
                  +
                </StyledMiniButton>
              )}
            </InputContainer>
          ))}
        </PackList>
      </PackListContainer>
      <Label htmlFor="notes">Notes</Label>
      <Input
        id="notes"
        name="notes"
        type="text"
        value={handoverData?.notes || ""}
        onInput={handleInput}
        disabled={formDisabled}
      />
      <ButtonContainer>
        <StyledTextButton
          type="button"
          onClick={isEditMode ? handleDiscard : handleReset}
          disabled={formDisabled}
        >
          {isEditMode ? "Discard" : "Reset"}
        </StyledTextButton>
        <StyledTextButton type="submit" disabled={formDisabled}>
          Save
        </StyledTextButton>
      </ButtonContainer>
    </TripForm>
  );
}
